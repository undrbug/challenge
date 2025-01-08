import express from "express";

const router = express.Router();


router.get('/', (req, res) => {
	res.send("Bienvenido al Chatbot de Sushi");
});

export default router;