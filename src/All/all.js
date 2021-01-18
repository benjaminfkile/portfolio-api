const express = require('express')
const AllService = require('./all-service');
const allRouter = express.Router()
const jsonParser = express.json()
const { v4: uuidv4 } = require('uuid')

allRouter
  .route('/')
  .get((req, res, next) => {
    let allData = { aboutP1: null, aboutP2: null, projects: null }
    let interval = setInterval(getData, 100)
    const knexInstance = req.app.get('db')
    AllService.getAboutP1(knexInstance)
      .then(AboutP1 => {
        allData.aboutP1 = AboutP1
      })
      .catch(next)
    AllService.getAboutP2(knexInstance)
      .then(AboutP2 => {
        allData.aboutP2 = AboutP2
      })
      .catch(next)
    AllService.getProjects(knexInstance)
      .then(Projects => {
        allData.projects = Projects
      })
      .catch(next)

    function getData() {
      if (allData.aboutP1 && allData.aboutP2 && allData.projects) {
        res.send(allData)
        clearInterval(interval)
      }
    }
  })
module.exports = allRouter