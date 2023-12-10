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
					url.parse(req.url, true).query.roomname
				);
		}

		ws.on("message", (message) => {
			const data = JSON.parse(message);
			if (data.action == "makeMove") {
				if (global.games[data.gameID].turn == ws.player) {
					global.games[data.gameID].move(data.move.tile);
				}
			}
		});
	});
};

export default startWebSocketServer;
