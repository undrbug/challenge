import express from "express";
import productosController from "../controllers/productos.controllers.js";
const router = express.Router();

//se podría mejorar!
// router.get("/", (req, res) => {
//   res.send("Bienvenido al Chatbot de Sushi");
// });

router.get("/", productosController.getMenu);


export default router;