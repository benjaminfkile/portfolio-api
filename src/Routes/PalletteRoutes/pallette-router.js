const express = require("express")
const crypto = require("crypto")
const palletteService = require("./pallette-service");
const palletteRouter = express.Router()
const jsonParser = express.json()


palletteRouter
    .route("/")
    .get((req, res, next) => {
        const knexInstance = req.app.get("db")
        palletteService.getPallettes(knexInstance)
            .then(pallette => {
                res.send(pallette)
            }).catch(next)
    })

palletteRouter
    .route("/post-pallette")
    .post(jsonParser, async (req, res, next) => {
        const knexInstance = req.app.get("db")
        const body = JSON.stringify(req.body)
        let id
        if (body.pallette && body.name) {
            id = crypto.randomBytes(16).toString('hex')
            body.pallette_id = id
            body.created_date = Date.now()
            palletteService.postPallette(knexInstance, body).then(() => {
                res.status(200).send({ message: "pallette posted", id: id })
            }).catch(next)
        } else {
            res.status(400).send({ message: "please add provide a pallette and a name" })
        }
    })

module.exports = palletteRouter