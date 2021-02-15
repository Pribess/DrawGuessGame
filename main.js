const http = require("http");
const websocket = require("./src/socket");
const fs = require("fs");


const app = http.createServer((req, res) => {
    let url = req.url;

    if (url.endsWith("/")) {
      url = url + "index.html";
    } 
    if (url.endsWith("js") || url.endsWith("css") || url.endsWith("html") || url.endsWith("png")) {
        url = url + "/index.html";
    }

    console.log(url);

    fs.readFile("./public" + url, (err, data) => {
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