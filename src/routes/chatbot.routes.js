import express from "express";
import chatBotController from "../controllers/chatbot.controllers.js";

const router = express.Router();

router.post("/", chatBotController.processMessage);

export default router;