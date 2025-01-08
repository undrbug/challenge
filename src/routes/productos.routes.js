import express from "express";
import productosController from "../controllers/productos.controllers.js";
const router = express.Router();

router.get("/", productosController.getMenu);

export default router;