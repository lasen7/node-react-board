import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';

import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

import passport from 'passport';
require('./passport');

import api from './routes';

const app = express();
const port = process.env.PORT || 3000;

const MongoStore = connectMongo(session);

/* SETUP MIDDLEWARE */

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000  // 14 days
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60            // 14 days
  })
}));

// using passport
app.use(passport.initialize());
app.use(passport.session());

// setup morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, '../../client/build/')));

// setup router
app.use('/api', api);

// Not found
// app.use((req, res, next) => {
//   res.status(404).send('Not found page');
// });

// handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.code).json({
    msg: err.message,
    code: err.errorCode
  });
});

// Connect mongodb
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod server');
});
mongoose.connect(process.env.DB_MONGO);

app.listen(port, () => {
  console.log('Server start port on ', port);
});