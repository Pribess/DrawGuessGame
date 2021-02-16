const http = require("http");
const websocket = require("./src/socket");
const fs = require("fs");


const app = http.createServer((req, res) => {
    let url = req.url;

    let spliturl = url.split("?");

    if (spliturl[0].endsWith("/")) {
      spliturl[0] = spliturl[0] + "index.html";
    }
    if(spliturl[1] != undefined) {
    websocket.pushqueue(spliturl[1])
    }
        
    fs.readFile("./public" + spliturl[0], (err, data) => {
        if (err) {
            console.error(err);
            const filebuf = fs.readFileSync("./public/error/404.html");
            res.writeHead(404);
            res.write(filebuf);
        } else {
            res.writeHead(200);
            res.write(data);
        }
        res.end();
    });
    
});



try {
    websocket({port : 81});
    console.log("WsServer Successfully Init!");
} catch (e) {
    console.error(e);
}

try {
    app.listen(80);
    console.log("WebServer Successfully Init!");
} catch (e) {
    console.error(e);
}