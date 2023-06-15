const express = require("express");
const ws = require("ws");
const app = express();
const server = require("http").createServer(app);

const abc =
  "Irure eiusmod elit nisi ut qui nulla mollit officia nostrud commodo. Nulla ad do officia consequat magna non irure aliquip ut nisi dolor proident ipsum fugiat. Eu sint duis pariatur commodo laborum labore labore exercitation ea enim. Id duis veniam ut consequat. Aute ullamco pariatur laboris tempor labore proident cillum eiusmod culpa.Irure eiusmod elit nisi ut qui nulla mollit officia nostrud commodo. Nulla ad do officia consequat magna non irure aliquip ut nisi dolor proident ipsum fugiat. Eu sint duis pariatur commodo laborum labore labore exercitation ea enim. Id duis veniam ut consequat. Aute ullamco pariatur laboris tempor labore proident cillum eiusmod culpa.";

const wss = new ws.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("Connected");

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    const xyz = abc.split(" ");
    //console.log("asa", xyz);
    xyz.forEach((word, index) => {
      ws.send(word);
    });
  });
});

server.listen(3001, () => {
  console.log(`Server is listening to 3001`);
});
