const express = require('express')
const deviconService = require('./devicon-service');
const deviconRouter = express.Router()
const jsonParser = express.json()
const { v4: uuidv4 } = require('uuid')

deviconRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        deviconService.getDevicons(knexInstance)
            .then(Devicons => {
                res.json(Devicons)
            })
            .catch(next)
    })
    .post(jsonParser, async (req, res, next) => {
        const knexInstance = req.app.get('db')
        let id = uuidv4();
        const { title, link, order, side } = req.body
        console.log(req.body)
        let newDevicon = { title, link, order, side, id }
        if (newDevicon.title && newDevicon.link) {
            deviconService.postDevicon(knexInstance, newDevicon)
            return res.status(200).json({
                success: { message: 'devicon posted' }
            })
        } else {
            return res.status(400).json({
                error: { message: 'bad request' }
            })
        }
    })
module.exports = deviconRouter