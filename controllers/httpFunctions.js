import { v4 as uuidv4 } from "uuid";
import __dirname from "../helpers/dirname.js";

export const createGame = (req, res) => {
	res.cookie("gameID", uuidv4(), { maxAge: 3600000 });
	res.cookie("username", req.query.username, { maxAge: 3600000 });
	res.redirect("/game");
};

export const joinGame = (req, res) => {
	if (!global.games[req.query.gameID] || global.games[req.query.gameID].player2)
		res.redirect("/").end();
	res.cookie("gameID", req.query.gameID, { maxAge: 3600000 });
	res.redirect("/game");
};

export const sendGamePage = (req, res) => {
	res.sendFile(__dirname + "/public/game.html");
};

export const sendStartPage = (req, res) => {
	res.render("mainPage.ejs", { games: global.games });
};
