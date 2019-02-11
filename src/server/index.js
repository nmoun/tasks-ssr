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

// imports for client generation
import App from 'App'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import LabelProvider from 'labels/LabelProvider'
import defaultLang from 'labels/langs/en.json'

const app = express()
const MongoStore = connectMongo(session)

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
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
// app.use(passport.session());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../../dist")));

app.use('/', routes)

app.use((req, res) => {
  res.sendStatus(404);
});


app.listen(3000, () => console.log('express listening on port 3000'))