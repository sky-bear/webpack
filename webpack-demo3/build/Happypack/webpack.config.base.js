const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Happypack = require("happypack"); // 多线程打包
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "../dist"),
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
    new Happypack({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      ],
    }),
  ],
  module: {
    noParse: /jquery/, // 不去解析那些任何与给定正则表达式相匹配的文件
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: "Happypack/loader?id=js",
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: ["@babel/preset-env", "@babel/preset-react"],
        //   },
        // },
      },
    ],
  },
};
