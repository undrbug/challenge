import {config} from 'dotenv';
config({ path: '.env.example' });
import express from 'express';
import cors from 'cors';
import productosRoute from './routes/productos.routes.js';
import pedidosRoute from './routes/pedidos.routes.js';

const app = express();

app.use(express.json());

app.use('/pedido', pedidosRoute)
app.use('/menu', productosRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});