process.stdout.write('\033c');

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const jwt = require('jsonwebtoken')
const superInfluencer = require('./services/superinfluencer')


const app = express()

// CONFIG AND ENVIRONMENT LOADING FROM .env FILE
let config = require('./.env')
const environment = process.env.NODE_ENV
config = config[environment]
if (!config) {
  throw new Error(`❌ Invalid ${environment} environment`)
}

// MIDDLEWARES
app.use(cors())
app.use(superInfluencer)
app.use(morgan('combined'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// NONGOOSE
mongoose.connect(config.mongoURL + config.mongoDBName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (err) {
    throw new Error(err)
  }
  console.info('💾  Mongoose is connected')
})

// ROUTING
const apiRouter = require('./routes/index.router')
app.use('/api', apiRouter)

// Init server
app.listen(config.port, (err) => {
  if (err) {
    throw new Error(err)
  }
  console.info('\n' + '>'.repeat(40))
  console.info('💻  Reboot Server Live')
  console.info(`📡  PORT: http://localhost:${config.port}`)
  console.info('>'.repeat(40) + '\n')
})