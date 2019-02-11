const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

console.log('dist folder: '+ path.resolve(__dirname, '../dist'))

module.exports = {
  entry: './src/client/index.js',
  resolve: {
    modules: ['node_modules', 'src/client']
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function() { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'resolve-url-loader'
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
          options:{
            sourceMap: true
          }
        }]
      },
      {
        test: /\.(svg|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
      file: './index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
};
