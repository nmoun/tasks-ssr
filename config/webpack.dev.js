const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // overrides .babelrc to include styles in client bundle generation
            // (it is excluded for server launch with babel-node)
            plugins: [["./external/babel-plugin-ignore-imports", 
              {
                "extensions": []
              }
            ]]
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
});
console.log(JSON.stringify(devConfig, null, 2))
module.exports = devConfig
