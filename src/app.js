require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const textEntryRouter = require('./text-entries/text-entries.js')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const fileUploadsRouter = require('./file-uploads/file-uploads')
const questionaireRouter = require('./questions/questionaire')
const generalQsRouter = require('./questions/questions-general')
const userQsRouter = require('./questions/questions-user')
const videosRouter = require('./video/video-router')
const audioRouter = require('./audio-files/audio-router')
const imagesRouter = require('./image-files/images-router')
const path = require('path')
const userRelationships = require('./user-relationships/user-relationships')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.options('*', cors()) 
app.use(morgan(morganOption))
app.use(helmet())
let whiteList= ['https://te-quiero-mucho-app.juanbaltazar.vercel.app','http://localhost:3000']
let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate)
)

app.use('/api', textEntryRouter)
app.use('/api', usersRouter)
app.use('/api', authRouter)
app.use('/api', fileUploadsRouter)
app.use('/api', questionaireRouter)
app.use('/api', generalQsRouter)
app.use('/api', userQsRouter)
app.use('/api', videosRouter)
app.use('/api', audioRouter)
app.use('/api', imagesRouter)
app.use('/api/uploads', express.static('uploads'))
app.use('/api/uploads/static',
  express.static(path.join(process.cwd(), '/public', '/static'))
)
app.use('/api', userRelationships)

app.get('/api', (req, res) => {
  res.send('Hello, sweet world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if(NODE_ENV === 'production') {
    reponse = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error}
  }
  res.status(500).json(response)
})

module.exports = app
