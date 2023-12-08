import express from "express";
import startWebSocketServer from "./websocket/WebSocketServer.js";
import http from "http";
import gameRouter from "./routes/gameRouter.js";
import homeRouter from "./routes/homeRouter.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

global.games = {};

const app = express();
const server = http.createServer(app);

startWebSocketServer(server);

app.use("/game", gameRouter);
app.use("/", homeRouter);
app.use(express.static("public"));

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}!`);
});
