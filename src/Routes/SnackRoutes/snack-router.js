const express = require("express")
const jsonParser = express.json()
const snackRouter = express.Router()

snackRouter
    .route("/send-snack")
    .post(jsonParser, async (req, res, next) => {
        const io = req.app.get("globalIO")
        const snack = req.body.snack
        io.sockets.emit("snack", snack)
        res.send(snack)
    })

module.exports = snackRouter