#### ewebpack

> webpack 是一个模块打包工具，支持 ES6 Module、Commonjs、CMD、AMD 模块引入方式

#### 常用配置属性

- 配置文件

  ```
  默认名称是 webpack.config.js, 也可以使用 --config 更改webpack 启动配置文件
  --config webpack.build.js
  ```

- mode

  - development 开发模式
  - production

- entry
- output
- plugins 插件
- modules
- externals 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依

  ```javascript
  externals: {
    jquery: "jQuery"; // cdn 引入， webpack 不打包进入文件
  }
  ```

- devServer
- resolve 配置文件别名
  - extensions 省略文件后缀，尝试按顺序解析这些后缀名
  - mainFiles: ['index'] 解析文件目录时默认文件名
  - mainFields 默认 npm 导入模块时按照哪个字段导入
  - alias import 和 require 引入时的别名

### css 样式解析

> css-loader 解析 import/require 引入的 css
> style-loader 把 css 插入 head 中
> less-loader 解析 less (需要安装 less)
> MiniCssExtractPlugin.loader 抽离 css 文件形成单独的 css 文件
> postcss-loader autoprefixer
> css 代码压缩

```javascript
module: {
  rules: [
    // 配置css解析规则
    {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader",
          options: {
            insert: "body", // css插入位置，默认插入head尾部
          },
        },
        { loader: "css-loader" },
        "postcss-loader",
      ],
    },
    // 配置less解析规则
    {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader",
          options: {
            insert: "body", // css插入位置，默认插入head尾部
          },
        },
        { loader: "css-loader" },
        "postcss-loader",
        { loader: "less-loader" },
      ],
    },
  ];
}
```

这样配置的 css 会插入到 head 中， 以 style 的形式， 使用 `mini-css-extract-plugin`插件可以抽离 css

使用`postcss-loader`增加 css 前缀， 需要配置`postcss.config.js`

    ```javascript
    module.exports = {
      plugins: [require('autoprefixer')],
    }
    ```

同时`package.json`需要配置`browserslist`

```javascript
"browserslist": [
    "defaults",
    "not ie < 8",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```

css 代码压缩

```javascript
plugins: [new optimizeCss()];
```

### 文件图片处理

使用`file-loader`, 不包含 HTML 中引入的图片

```javascript
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  }
```

处理 html 中直接引入的图片 `html-withimg-loader`

```javascript
  {
    test: /\.html$/,
    use: {
      loader: 'html-withimg-loader',
    }
  }
  //  file-loader 需要配置 esModule：false
```

`url-loader`功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

```javascript
   {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 1,
            outputPath: 'img/' // 文件输入目录
          }
        }
      ]
    }

```

#### 多页面配置

`entry`写成多入口模式，使用`html-webpack-plugin`生成多个 html

```javascript
    entry: {
      home: './src/index/index.js',
      main: './src/main/index.js'
    }
  ...

    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      Hash: true,
      chunks: ['home'], // 用于区分需要引入的js
      filename: 'index.html'
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      Hash: true,
      chunks: ['main'],
      filename: 'main.html'
    })


```

#### 区分环境

使用`webpack-merge`合并配置

```javascript
const { merge } = require("webpack-merge");
const BaseConfig = require("./webpack.config.base.js");
const developmentConfig = require("./webpack.config.dev.js");
const productionConfig = require("./webpack.config.prod.js");

module.exports = (env) => {
  console.log(env);
  if (env === "dev") {
    return merge([BaseConfig, developmentConfig]);
  } else {
    return merge([BaseConfig, productionConfig]);
  }
};

// "dev": "npx webpack --env dev",
// "test": "npx webpack --env test"
```

#### source-map 配置 [文档](https://www.webpackjs.com/configuration/devtool/)

增加源码映射,方便代码出现问题， 进行调试和问题查找

- source-map 产生单独的文件
- eval-source-map 不产生单独的文件，但是可以显示行和列
- cheap-module-source-map 不会产生列，但是是一个单独映射文件
- cheap-module-eval-source-map 不产生单独的文件，集成在打包后的文件， 不产生列

#### 监控文件更改

`watch`属性可以监控文件的修改，并作出操作，默认 false, 不开启

```javascript
watch: true,
watchOptions: {
    aggregateTimeout: 300, // 防抖
    poll: 1000,  // 每1秒检查一次变动
    ignored: /node_modules/  // 忽略文件
  }
```

#### 跨域

`webpack-dev-serve`中`proxy`, 配置相关的开发跨域

- `webpack-dev-serve`中已经存在`express`模块可以使用`express`配合 proxy 模拟数据

  ```javascript
  // server
  const express = require("express");
  const app = express();
  app.get("/api/user", (req, res) => {
    res.json({ name: "跨域测试" });
  });
  app.listen(3000);

  // webpack.config.js
    proxy: {
      "/api": "http://localhost:3000"
    }

  ```

- before
  ```javascript
   before(app, server, compiler) {
     app.get("/api/user", (req, res) => {
        res.json({ name: "跨域测试" });
      });
    }
  ```

#### 配置编译时的全局变量

`webpack.DefinePlugin`

```javascript
new webpack.DefinePlugin({
  // DEV: 'dev' , // 如果书写成单个引号， 会解析成变量
  DEV: JSON.stringify("dev"),
});
```

#### 常用插件

- `html-webpack-plugin` 该插件将为你生成一个 HTML5 文件， 其中包括使用 `script` 标签的 body 中的所有 webpack 包

  ```javascript
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"), // 模板路径， 绝对路径和相对路径都行
      hash: true, // 防止缓存， 每次改动都有新的hash
    }),
  ];
  ```

- `mini-css-extract-plugin`抽离 css,形成独立的文件, 只在生产环境使用

  ```javascript
  ...
  plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css', // 生成的文件名称以及目录
      })
    ],
    module: {
      rules: [
        // 配置css解析规则
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
          ]
        },
        // 配置less解析规则
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'less-loader' },
          ]
        }
      ]
    }
  ```

- `clear-webpack-plugin` 删除先前的文件

```javascript
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')

  ...
  new CleanWebpackPlugin()
```

- `copy-webpack-plugin` 复制文件 不同的版本写法不同， 最好装 @5

```javascript
new CopyPlugin([
  {
    from: path.resolve(__dirname, "doc"),
    to: path.resolve(__dirname, "./dist"),
  },
]);
```

- `webpack.BannerPlugin()` 版权声明 webpack 内置插件、

```javascript
new webpack.BannerPlugin("需要添加到打包文件前面的注释");
```

#### Eslint 配置

需要安装`eslint eslint-loader`, 同时需要准备`.eslintrc.json`文件

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            // es6 => ES5
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-class-properties", // 转换ES7语法
              "@babel/plugin-transform-runtime",
            ],
          },
        },
        {
          loader: "eslint-loader", // eslint-loader一定要先执行在babel-loader前面
          options: {
            fix: true, // 自动做简单的修复
          },
        },
      ],
    },
  ];
}
```

#### 语法转换 babel

配置语法转换 需要安装`babel-loader @babel/core @babel/preset-env`[文档](https://babeljs.io/setup#installation)

根据使用的语法不同， 需要安装不同的 babel， 例如`@babel/plugin-transform-runtime`,`@babel/polyfill`

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          // es6 => ES5
          presets: ["@babel/preset-env"],
          plugins: [
            "@babel/plugin-proposal-class-properties", // 转换ES7语法
          ],
        },
      },
    },
  ];
}
```

#### 暴露全局变量

- 默认一些插件是没有将变量暴露到全局的，如果需要， 使用`expose-loader`,暴露
  例如 暴露全局 $

```javascript
...
import $ from "jquery";
console.log($, window.$, jQuery, window.jQuery)


....
{
  test: require.resolve("jquery"),
  loader: "expose-loader",
  options: {
    exposes: ["$"],
  },
}
```

- 使用`webpack`插件方法`ProvidePlugin`,每个模块自动注入

```javascript
...
// import $ from "jquery"; 无需引入
console.log($, window.$, jQuery, window.jQuery)


....
 new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })


...
 {
    test: require.resolve("jquery"),
    loader: "expose-loader",
    options: {
      exposes: ["$"], // 将 $ 装到全局
    },
  }
```

#### 优化

- `module`

```javascript
 module: {
    noParse: /jquery/, // 不去解析那些任何与给定正则表达式相匹配的文件
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        // include：Path.resolve('src')
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  }
```

- `module`中配置`noParse`, 不去解析正则匹配的文件， 提高打包速度
- `exclude`排除所有符合条件的模块
- `include `引入所有符合条件的模块 【`exclude`和`include`二选其一】

- `plugins`插件

  - `Webpack.IgnorePlugin`忽略第三方包指定目录，让这些指定目录不要被打包进去

  ```javascript
  // webpack版本不同， 写法不同
  new Webpack.IgnorePlugin(/\.\/locale/, /moment/), //moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }); // 忽略第三包内部的有引入的文件

  //手动引入所需要的语言包
  import "moment/locale/zh-cn";
  ```
