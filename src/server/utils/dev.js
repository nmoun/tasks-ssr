// everything regarding DEV environment setup

// create & configure a webpack compiler
var webpack = require('webpack');
var webpackConfig = require('../../../config/webpack.dev');
var compiler = webpack(webpackConfig);
export var webpackDevMiddleware = require("webpack-dev-middleware")(compiler, {
  logLevel: 'debug', publicPath: webpackConfig.output.publicPath
})
export var webpackHotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
})