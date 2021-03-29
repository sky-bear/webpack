const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  // mode: "development",
  entry: {
    react: ["react", "react-dom"],
  },
  output: {
    filename: "_dll_[name].js",
    path: path.resolve(__dirname, "../dist"),
    library: "_dll_[name]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      // name === library
      name: "_dll_[name]",
      path: path.resolve(__dirname, "../dist", "mainfest.json"),
      context: __dirname,
    }),
  ],
};
