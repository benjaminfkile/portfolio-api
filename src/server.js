require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const { PORT, NODE_ENV } = require("./config")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require('socket.io')(server, { origins: '*:*'});
const morganOption = (NODE_ENV === "production")
  ? "tiny"
  : "common";

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

let message = {
  PalleteColor1: "#2FF3E0",
  PalleteColor2: "#F8D210",
  PalleteColor3: "#FA26A0",
  PalleteColor4: "#F51720"
}

io.on("connection", (socket) => {
  socket.emit("theme", message);
});

// app.get("/", (req, res) => {
//   res.status(200).send({message: message})
// })

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

