const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();

// CONFIG AND ENVIRONMENT LOADING FROM .env FILE
let config = require('./.env');
const environment = process.env.NODE_ENV;
config = config[environment];
if (!config) {
  return console.error(`❌ ERROR | Invalid ${environment} environment`);
}

app.use(cors({ origin: 'http://localhost:8080'}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded( {extended: false}));

const authenticate = (req, res, next) => {
  jwt.verify(req.headers.token, 'secret', (err, token) => {
    if (err) {
      res.status(403).json({
        error: 'Token not valid'
      })
    }
    res.locals.token = token;
    next();
  });
}

// NONGOOSE
mongoose
  .connect(config.mongoURL + config.mongoDBName, {
    useNewUrlParser: true
  })
  .then(() => console.info('🗄️  MongoDB Connected'))
  .catch(err => console.log(err));;

// ROUTING
const apiRouter = require('./routes');
app.use('/api', apiRouter);

app.get('/api/login', authenticate, (req, res) => {
  console.log(res.locals.token.email);
  const UserModel = require('./models/users.model');
  UserModel
    .findOne({
      email: res.locals.token.email
    })
    .then(user => {
      res.send(`jalou! ${ user.name }`);
    })
})

// Init server
app.listen(config.port, (err) => {
  console.info('.\n\n\n' + '*'.repeat(60))
  console.info(`💻  Reboot Backend Server Live`);
  console.info(`📡  PORT: http://localhost:${config.port}`);
  console.info('*'.repeat(60) + '\n\n\n.');
})

// //Connect to the server
// client.connect(function(err) {
//   console.log("Connected succesfully to the server");
//   const db = client.db(dbName);
//   client.close();
// })

