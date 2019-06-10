var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  devServer: {
    host: 'localhost',
    port: '3001',
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': '*'
    },
    stats: 'errors-only',
    hot: true,
    inline: true,
  },

  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}
