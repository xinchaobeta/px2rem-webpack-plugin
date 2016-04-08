var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var px2remWebpackPlugin = require('../../dist')

module.exports = {
  context: __dirname,
  entry: './app.js',
  output:{
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, exclude: /node_modules/, loader: 'style!css'},
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
    }),
    new px2remWebpackPlugin(),
  ],
}
