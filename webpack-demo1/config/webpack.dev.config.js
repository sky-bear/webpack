const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin')
export const webpackDev = {
  mode: 'development',
  entry: './src/index.js', //  绝对路径 string | object | array
  output: {
    filename: 'bundle.[hash].js', // 防止缓存可以添加hash值
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "/assets/"
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
    // new MiniCssExtractPlugin({
    //   filename: '[name].css', // 生成的文件名称
    // }),
  ],
  module: {
    rules: [
      // 配置css解析规则
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'body' // css插入位置，默认插入head尾部
            }
          },
          { loader: 'css-loader' },
          'postcss-loader'
        ]
      },
      // 配置less解析规则
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'body' // css插入位置，默认插入head尾部
            }
          },
          { loader: 'css-loader' },
          'postcss-loader',
          { loader: 'less-loader' },
        ]
      }
    ]
  }
}
