import { config } from "dotenv";
config({ path: ".env.example" });
import express from "express";
import cors from "cors";

import productosRoute from "./routes/productos.routes.js";
import pedidosRoute from "./routes/pedidos.routes.js";
import indexRoutes from "./routes/index.routes.js";
import faqsIndex from "./routes/faqs.routes.js";
import chatBotRoute from "./routes/chatbot.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

//se podría mejorar!
app.use("/", indexRoutes);
app.use("/pedido", pedidosRoute);
app.use("/menu", productosRoute);
app.use("/faq", faqsIndex);
app.use("/chat", chatBotRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});
