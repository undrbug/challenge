import {config} from 'dotenv';
config({ path: '.env.example' });
import express from 'express';
import cors from 'cors';
import productosRoute from './routes/productos.routes.js';

import connectDB from './config/db.js';

const app = express();

connectDB();

app.use(express.json());

app.use('/', productosRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});