const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: [
    './src/client/index.js'
  ],
  resolve: {
    modules: ['node_modules', 'src/client']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
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
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // extract css in production mode
          }, 
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
            options: {
              sourceMap: devMode ? true : false
            }
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function() { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ]
              }
            }
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader', // compiles Sass to CSS
            options:{
              sourceMap: true // necessary for resolve-url-loader package 
            }
          }
        ]
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
}
