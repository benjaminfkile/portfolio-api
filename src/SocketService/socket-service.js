const service = {

    socketHandler(globalIO) {

        let io = globalIO

        let message = {
            PalleteColor1: "#2FF3E0",
            PalleteColor2: "#F8D210",
            PalleteColor3: "#FA26A0",
            PalleteColor4: "#F51720"
          }


        io.on("connection", (socket) => {
            socket.emit("theme", message)
        })

        io.on("connection", (socket) => {
            socket.on("theme", (theme) => {
                io.sockets.emit("theme", theme)
            })
        })
    }
}

module.exports = service