import express from "express";
import {
	createGame,
	joinGame,
	sendGamePage,
} from "../controllers/httpFunctions.js";

const router = express.Router();

router.get("/create", createGame);
router.get("/join", joinGame);
router.get("/", sendGamePage);

export default router;
