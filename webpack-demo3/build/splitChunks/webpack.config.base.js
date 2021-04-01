const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  // entry: "./src/test2/index.js",
  entry: {
    index: "./src/test2/index.js",
    other: "./src/test2/other.js",
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  optimization: {
    splitChunks: {
      // 分割代码
      cacheGroups: {
        // 缓存组
        commons: {
          // 抽离代码中的公共模块
          name: "commons",
          chunks: "initial", // 入口
          minChunks: 2, // 引用次数
          minSize: 0, // 最小大小
        },
        vendor: {
          // 抽离第三包
          priority: 1, // 增加权重， 有限抽离第三包
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@/src": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../dist", "mainfest.json"),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }), // 忽略第三包内部的有引入的文件
    // new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      Hash: true,
      // chunks: ['home'],
      filename: "index.html",
    }),
  ],
  module: {
    noParse: /jquery/, // 不去解析那些任何与给定正则表达式相匹配的文件
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
