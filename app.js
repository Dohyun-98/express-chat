import express from "express";
import http from "http";
import fs from "fs";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
  // ...
});

app.use(express.static("src"));

app.get("/", (req, res) => {
  fs.readFile("./src/index.html", (err, data) => {
    if (err) throw err;
    res
      .writeHead(200, {
        "Content-Type": "text/html",
      })
      .write(data)
      .end();
  });
});

io.on("connection", (socket) => {
  console.log("connect");
});

server.listen(port, () => {
  console.log("start server!");
});
