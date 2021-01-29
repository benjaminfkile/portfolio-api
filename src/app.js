require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const get = require('./Get/get')
const devicons = require('./Devicons/devicons')
const skills = require('./Skills/skills')
const projects = require('./Projects/projects')
const aboutP1 = require('./About/AboutP1/about-p1')
const aboutP2 = require('./About/AboutP2/about-p2')
const landing = require('./Landing/landing')
const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(cors())
app.use(helmet())

app.use('/', landing)
app.use('/api/projects', projects)
app.use('/api/about-p1', aboutP1)
app.use('/api/about-p2', aboutP2)
app.use('/api/skills', skills)
app.use('/api/devicons', devicons)
app.use('/api/get', get)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'development') {
    response = { error: 'Server error' }
  } else {
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app//bump