const express = require('express')
const skillService = require('./skill-service');
const skillRouter = express.Router()
const jsonParser = express.json()
const { v4: uuidv4 } = require('uuid')

skillRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        skillService.getSkillsP1(knexInstance)
            .then(Skill => {
                res.json(Skill)
            })
            .catch(next)
    })
    .post(jsonParser, async (req, res, next) => {
        const knexInstance = req.app.get('db')
        let id = uuidv4();
        const { p1 } = req.body
        let skills = { id, p1 }
        if (skills.p1) {
            skillService.deleteSkillsP1(knexInstance)
            skillService.postSkillsP1(knexInstance, skills)
            return res.status(200).json({
                success: { message: 'skill paragraph posted' }
            })
        } else {
            return res.status(400).json({
                error: { message: 'bad request' }
            })
        }
    })
module.exports = skillRouter