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
        let body = req.body
        let id
        console.log("name:", body.name)
        console.log("pallette:", body.pallette)
        if (body.pallette && body.name) {
            id = crypto.randomBytes(16).toString('hex')
            body.pallette_id = id
            body.created_date = Date.now()
            palletteService.postPallette(knexInstance, body).then((pallette) => {
                res.status(200).send({ message: "pallette posted", id: id, pallette: pallette })
            }).catch(next)
        } else {
            res.status(400).send({ message: "please provide a pallette and a name" })
        }
    })

palletteRouter
    .route("/set-pallette")
    .post(jsonParser, async (req, res, next) => {
        const knexInstance = req.app.get("db")
        const io = req.app.get("globalIO")
        const id = req.body.id
        palletteService.getPalletteById(knexInstance, id).then(pallette => {
            io.sockets.emit("theme", pallette)
            res.send(pallette)
        }).catch(next)

        let message = {
            PalleteColor1: "#2FF3E0",
            PalleteColor2: "#F8D210",
            PalleteColor3: "#FA26A0",
            PalleteColor4: "#F51720"
        }





    })

module.exports = palletteRouter