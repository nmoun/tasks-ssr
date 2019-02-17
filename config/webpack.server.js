const path = require('path')
const nodeExternals = require('webpack-node-externals')

if(process.env.NODE_ENV !== 'production'){
  throw new Error('webpack.server should be launched in production mode, only')
}

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  entry: './src/server/index.js',
  devtool: 'false',
  resolve: {
    modules: ['node_modules', 'src/client']
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },
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
        use: [{
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: {
            sourceMap: false
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
}
