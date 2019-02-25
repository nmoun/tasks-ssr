const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
console.log('__dirname: ' + __dirname)
console.log('resolved client folder: ' + path.resolve(__dirname, '../src/client'))
module.exports = {
  entry: [
    './src/client/index.js'
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', 'src/client']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CopyPlugin([
      (devMode) ? 'node_modules/react/umd/react.development.js' : 'node_modules/react/umd/react.production.min.js',
      (devMode) ? 'node_modules/react-dom/umd/react-dom.development.js' : 'node_modules/react-dom/umd/react-dom.production.min.js',
    ]),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        include: path.resolve(__dirname, '../src/client'),
        loader: 'source-map-loader'
      },
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
