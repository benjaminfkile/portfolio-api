const express = require('express')
const ProjectService = require('./project-service');
const projectRouter = express.Router()
const jsonParser = express.json()
const { v4: uuidv4 } = require('uuid')

projectRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ProjectService.getProjects(knexInstance)
      .then(Projects => {
        res.json(Projects)
      })
      .catch(next)
  })
  .post(jsonParser, async (req, res, next) => {
    const knexInstance = req.app.get('db')
    const { name, description, tech, mobile, desktop, repo, url } = req.body
    let id = uuidv4();
    let newProject = { id, name, description, tech, mobile, desktop, repo, url }
    if (newProject.id && newProject.name && newProject.description && newProject.tech.length > 0 && newProject.mobile.length > 0 && newProject.desktop.length > 0 && newProject.repo && newProject.url) {
      ProjectService.postProject(knexInstance, newProject)
      return res.status(200).json({
        success: { message: 'project posted' }
      })
    } else {
      return res.status(400).json({
        error: { message: 'bad request' }
      })
    }
  })//
module.exports = projectRouter