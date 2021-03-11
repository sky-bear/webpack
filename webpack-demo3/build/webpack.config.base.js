const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
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

    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }), // 忽略第三包内部的有引入的文件
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      Hash: true,
      // chunks: ['home'],
      filename: "index.html",
    }),
    new
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
