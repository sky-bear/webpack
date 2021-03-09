const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/index.js', //  绝对路径 string | object | array
  output: {
    filename: 'bundle.[hash].js', // 防止缓存可以添加hash值
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/assets/"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true, // 启用压缩
    port: 9000,
    open: true, // 浏览器打开一个页面
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'), // 模板路径， 绝对路径和相对路径都行
      hash: true // 防止缓存， 每次改动都有新的hash
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // 生成的文件名称
    }),
    new optimizeCss(), // css 压缩
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      DEV: 'dev'
    })
  ],
  externals: {
    jquery: 'jquery'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-withimg-loader',
        }
      },
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
      },

      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$"],
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { // es6 => ES5
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-class-properties', // 转换ES7语法
                '@babel/plugin-transform-runtime'
              ]
            }
          },
          // {
          //   loader: "eslint-loader", // eslint-loader一定要先执行在babel-loader前面
          //   options: {
          //     fix: true // 自动做简单的修复
          //   }
          // }
        ]
      },
      // 配置css解析规则
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insert: 'body' // css插入位置，默认插入head尾部
          //   }
          // },
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          'postcss-loader'
        ]
      },
      // 配置less解析规则
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          // {
          //   // loader: 'style-loader',
          //   options: {
          //     insert: 'body' // css插入位置，默认插入head尾部
          //   }
          // },
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          'postcss-loader',
          { loader: 'less-loader' },
        ]
      }
    ]
  }
}
