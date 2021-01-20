const express = require('express')
const GetService = require('./get-service');
const getRouter = express.Router()

getRouter
  .route('/')
  .get((req, res, next) => {
    let data = { aboutP1: null, aboutP2: null, skillsP1: null, devicons: null, projects: null }
    let interval = setInterval(listen, 100)
    const knexInstance = req.app.get('db')

    GetService.getAboutP1(knexInstance)
      .then(AboutP1 => {
        data.aboutP1 = AboutP1
      })
      .catch(next)
    GetService.getAboutP2(knexInstance)
      .then(AboutP2 => {
        data.aboutP2 = AboutP2
      })
      .catch(next)
    GetService.getSkillsP1(knexInstance)
      .then(SkillsP1 => {
        data.skillsP1 = SkillsP1
      })
      .catch(next)
    GetService.getDevicons(knexInstance)
      .then(Devicons => {
        data.devicons = Devicons
      })
      .catch(next)
    GetService.getProjects(knexInstance)
      .then(Projects => {
        data.projects = Projects
      })
      .catch(next)

    function listen() {
      if (data.aboutP1 && data.aboutP2 && data.skillsP1 && data.projects && data.devicons) {
        res.send(data)
        clearInterval(interval)
      }
    }
  })
module.exports = getRouter