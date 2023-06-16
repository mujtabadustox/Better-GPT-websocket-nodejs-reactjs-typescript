import express from "express";
import ws from "ws";
import http from "http";
import answers from "./answers";

const app = express();
const server = http.createServer(app);

const wss = new ws.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("Connection Opened");

  ws.on("message", function message(data) {
    console.log("Received From Client", data.toString());
    const msg: string = data.toString();
    const ind: number = Number(msg);
    const words = answers[ind].split(" ");

    const delay: number = 100;
    let index: number = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        ws.send(words[index]);
        index++;
      } else {
        clearInterval(interval);
        ws.close();
      }
    }, delay);

    ws.on("close", function close() {
      console.log("Connection Closed");
      ws.close();
    });
  });
});

server.listen(3001, () => {
  console.log(`Server is listening to 3001`);
});
