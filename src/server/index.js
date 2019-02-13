import {} from 'dotenv/config' // server environment variables
import express from 'express'
import path from 'path'
import routes from './routes'
import session from 'express-session'
import {db} from './db'
import connectMongo from 'connect-mongo'
import passport from './passport' // authentication
import helmet from 'helmet' // security
import morgan from 'morgan' // logging

const app = express()
const MongoStore = connectMongo(session)

let assetPath = __dirname
if(process.env.NODE_ENV !== 'production'){
  console.log('environment development')
  app.use(morgan('dev'))
  assetPath += '/../../dist'
  console.log('__dirname path: ' + path.resolve(__dirname))
  console.log('asset path: ' + path.resolve(assetPath))

  // setup HRM for development environment
  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require('../../config/webpack.dev');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    logLevel: 'warn', publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
}

app.disable('x-powered-by')
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(session({
  secret: 'wth',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use(passport.initialize());
app.use(express.json());

app.use(express.static(path.resolve(assetPath)));

app.use('/', routes)

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => console.log('express listening on port 3000'))