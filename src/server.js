require("dotenv").config()
const knex = require("knex")
const { PORT, NODE_ENV, DATABASE_URL } = require("./config")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require('socket.io')(server, { origins: '*:*' })
const socketService = require("./SocketService/socket-service")
const morganOption = (NODE_ENV === "production")
  ? "tiny"
  : "common"

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
})

app.set("db", db)


const palletteRouter = require("./Routes/PalletteRoutes/pallette-router")

app.set("globalIO", io)
const globalIO = app.get("globalIO")
socketService.socketHandler(globalIO)

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.get("/", (req, res) => {
  res.send("Portfolio API")
})

app.use("/api/pallettes", palletteRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})