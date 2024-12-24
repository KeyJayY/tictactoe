import handleMessage from "./handleMessageTictactoe.js";
import url from "url";

const handleConnect = (req, socket, head, tictactoeServer) => {
	tictactoeServer.handleUpgrade(req, socket, head, (ws) => {
		const gameID = url.parse(req.url, true).query.gameID;
		if (gameID && global.games[gameID]) {
			if (global.games[gameID].player1) {
				if (!global.games[gameID].player2)
					global.games[gameID].joinAndStart(ws);
			} else {
				global.games[gameID].joinHost(ws);
			}
		}
		ws.on("message", handleMessage(ws));
		ws.on("close", (event) => {
			if (gameID) delete global.games[gameID];
		});
	});
};

export default handleConnect;
