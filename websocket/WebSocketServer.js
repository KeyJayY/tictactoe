import url from "url";
import { WebSocketServer } from "ws";
import Game from "../models/game.js";

const startWebSocketServer = (server) => {
	const wss = new WebSocketServer({ server });
	wss.on("connection", (ws, req) => {
		const gameID = url.parse(req.url, true).query.gameID;
		if (gameID) {
			if (global.games[gameID] && !global.games[gameID].player2)
				global.games[gameID].joinAndStart(ws);
			else
				global.games[gameID] = new Game(
					ws,
					url.parse(req.url, true).query.roomname,
					url.parse(req.url, true).query.password
				);
		}

		ws.on("message", (message) => {
			console.log(global.games);
			const data = JSON.parse(message);
			if (data.action == "makeMove") {
				if (global.games[data.gameID].turn == ws.player) {
					global.games[data.gameID].move(data.move.tile);
				}
			} else if (data.action == "abortGame") {
				global.games[data.gameID].player1?.socket.send(
					JSON.stringify({ data: "koniec" })
				);
				global.games[data.gameID].player2?.socket.send(
					JSON.stringify({ action: "abortGame" })
				);
				delete global.games[data.gameID];
			}
		});
		ws.on("close", (event) => {});
	});
};

export default startWebSocketServer;
