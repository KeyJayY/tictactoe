import { v4 as uuidv4 } from "uuid";
import __dirname from "../helpers/dirname.js";

export const createGame = (req, res) => {
	res.cookie("gameID", uuidv4(), { maxAge: 360000 });
	res.cookie("roomname", req.query.roomname, { maxAge: 360000 });
	if (req.query.isLocked)
		res.cookie("password", req.query.password, { maxAge: 360000 });
	res.redirect("/game");
};

export const joinGame = (req, res) => {
	if (!global.games[req.query.gameID] || global.games[req.query.gameID].player2)
		res.redirect("/").end();
	if (
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
