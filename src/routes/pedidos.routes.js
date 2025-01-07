import express from "express";
import pedidosController from "../controllers/pedidos.controllers.js";

const router = express.Router();

router.post("/", pedidosController.putPedido);

router.get('/lista', pedidosController.getPedidos);

export default router;