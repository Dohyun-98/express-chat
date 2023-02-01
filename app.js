import express from "express";
import fs from "fs";
import { Server } from "socket.io";

const app = express();
const port = 3000;
const io = new Server(app, {
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

io.sockets.on("connection", function (socket) {
  console.log("connect");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
