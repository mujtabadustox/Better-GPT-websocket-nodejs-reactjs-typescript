"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const http_1 = __importDefault(require("http"));
const answers_1 = __importDefault(require("./answers"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server: server });
wss.on("connection", function connection(ws) {
    console.log("Connection Opened");
    ws.on("message", function message(data) {
        console.log("Received From Client", data.toString());
        const msg = data.toString();
        const ind = Number(msg);
        const words = answers_1.default[ind].split(" ");
        const delay = 100;
        let index = 0;
        const interval = setInterval(() => {
            if (index < words.length) {
                ws.send(words[index]);
                index++;
            }
            else {
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
