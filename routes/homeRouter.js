import express from "express";
import { sendStartPage } from "../controllers/httpFunctions.js";

const router = express.Router();

router.get("/", sendStartPage);

export default router;
