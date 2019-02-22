const merge = require('webpack-merge')
const common = require('./webpack.common.js')
var webpack = require('webpack')

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
})
console.log(JSON.stringify(devConfig, null, 2))
module.exports = devConfig
