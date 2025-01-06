import express from "express";
import productosController from "../controllers/productos.controllers.js";
const router = express.Router();

router.get("/menu", productosController.getMenu);

// router.get("/", (req, res) => {
//   res.send("Bienvenido al Chatbot de Sushi");
// });

export default router;