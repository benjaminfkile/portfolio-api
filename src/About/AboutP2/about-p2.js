const express = require('express')
const aboutP2Service = require('./about-p2-service');
const aboutRouter = express.Router()
const jsonParser = express.json()
const { v4: uuidv4 } = require('uuid')

aboutRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        aboutP2Service.getAboutP1(knexInstance)
            .then(About => {
                res.json(About)
            })
            .catch(next)
    })
    .post(jsonParser, async (req, res, next) => {
        const knexInstance = req.app.get('db')
        let id = uuidv4();
        const { p2 } = req.body
        let newAbout = { id, p2 }
        if (newAbout.p2) {
            aboutP2Service.deleteAboutP1(knexInstance)
            aboutP2Service.postAboutP1(knexInstance, newAbout)
            return res.status(200).json({
                success: { message: 'about posted' }
            })
        } else {
            return res.status(400).json({
                error: { message: 'bad request' }
            })
        }
    })
module.exports = aboutRouter