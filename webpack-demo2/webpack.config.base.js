const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    home: "./src/index/index.js",
    // main: './src/main/index.js'
  },
  output: {
    filename: "index.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "dist"),
    // port: 8080,
    // open: true,
    // hot: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  devtool: "eval-source-map", // 是否生成源码映射
  resolve: {
    alias: {
      "@/src": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      Hash: true,
      // chunks: ['home'],
      filename: "index.html",
    }),
    // new htmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'index.html'),
    //   Hash: true,
    //   chunks: ['main'],
    //   filename: 'main.html'
    // })
    // new CopyPlugin([
    //   {
    //     from: path.resolve(__dirname, "doc"),
    //     to: path.resolve(__dirname, "./dist"),
    //   },
    // ]),
    // new webpack.BannerPlugin("make"),
    new webpack.DefinePlugin({
      // DEV: 'dev' , // 如果书写成单个引号， 会解析成变量
      DEV: JSON.stringify("dev"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 300, // 防抖
  //   poll: 1000, // 每1秒检查一次变动
  //   ignored: /node_modules/, // 忽略文件
  // },
};
