import { v4 as uuidv4 } from "uuid";
import __dirname from "../helpers/dirname.js";
import Game from "../models/game.js";
import WsServers from "../websocket/WebSocketServer.js";

export const createGame = (req, res) => {
	const gameID = uuidv4();
	res.cookie("gameID", gameID, { maxAge: 360000 });
	global.games[gameID] = new Game(req.query.roomname, req.query.password);

	const gamesToSend = Object.entries(global.games).reduce((acc, [key, val]) => {
		acc[key] = {};
		acc[key].roomname = val.roomname;
		acc[key].isLocked = val.password != undefined;
		return acc;
	}, {});
	WsServers.getInstance().menuServer.clients.forEach((client) => {
		client.send(JSON.stringify({ action: "updateGames", games: gamesToSend }));
	});
	res.redirect("/game");
};

export const joinGame = (req, res) => {
	if (!global.games[req.query.gameID] || global.games[req.query.gameID].player2)
		res.redirect("/");
	else if (
		global.games[req.query.gameID].password == "" ||
		global.games[req.query.gameID].password == req.query.password
	) {
		res.cookie("gameID", req.query.gameID, { maxAge: 360000 });
		res.redirect("/game");
	} else {
		res.redirect("/");
	}
};

export const sendGamePage = (req, res) => {
	res.sendFile(__dirname + "/public/game.html");
};

export const sendStartPage = (req, res) => {
	res.render("mainPage.ejs", { games: global.games });
};
