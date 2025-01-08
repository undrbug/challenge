import express from "express";
import chatBotMessage from "../controllers/chatbot.controllers.js";

const router = express.Router();

router.post("/", chatBotMessage.processMessage);

export default router;