const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
      file: './index.html'
    })
  ],
  devServer: {
    proxy: {
      "/api": "http://localhost:3000"
    },
    overlay: true
  }
});
