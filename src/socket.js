const { Server } = require("ws")
const ws = require("ws");

let ClientArray = new Array();

module.exports = (server) => {
    const wss = new ws.Server(server);

    wss.on("connection", (ws, req) => {
        let ip = req.connection.remoteAddress.substring(7);

        ClientArray.push({ws, ip});

        console.log(ip);
    });
}