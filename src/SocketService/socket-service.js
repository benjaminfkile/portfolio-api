const service = {

    socketHandler(globalIO) {

        let io = globalIO

        let message = {
            PalleteColor1: "#000328",
            PalleteColor2: "#686868",
            PalleteColor3: "#494949",
            PalleteColor4: "#bf811d"
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