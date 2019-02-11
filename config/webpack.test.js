const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

console.log('cwd: ' + appDirectory);
console.log('src folder location: ' + resolveApp('./src/client'));
module.exports = {
  entry: './test/client/test.js',
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', resolveApp('./src/client')]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: [/node_modules/, /framework/],
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
              ignore: false
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /framework/],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './test/client/template/index.html',
      filename: './index.html'
    })
  ],
  node: {
    fs: 'empty'
  }
};
