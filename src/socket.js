const ws = require("ws");

let queue;

module.exports = (server) => {
    const wss = new ws.Server(server);
    
    let ClientArray = new Array();

    wss.on("connection", (ws, req) => {
        let ip = req.connection.remoteAddress.substring(7);

        ClientArray.push({ws, ip, queue});

        var jsonbuf = {"type":0,
            "username":queue}
        ws.send(JSON.stringify(jsonbuf));
    });

}

module.exports.pushqueue = (qbuf) => {
    queue = qbuf;
}