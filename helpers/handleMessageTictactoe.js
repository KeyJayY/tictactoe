const handleMessage = (ws) => (message) => {
	const data = JSON.parse(message);
	if (data.action == "makeMove") {
		if (global.games[data.gameID]?.turn == ws.player) {
			global.games[data.gameID]?.move(data.move.tile);
		}
	} else if (data.action == "abortGame") {
		global.games[data.gameID]?.player1?.socket.send(
			JSON.stringify({ action: "abortGame" })
		);
		global.games[data.gameID]?.player2?.socket.send(
			JSON.stringify({ action: "abortGame" })
		);
		delete global.games[data.gameID];
	}
};

export default handleMessage;
