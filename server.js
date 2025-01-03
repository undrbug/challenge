import {config} from 'dotenv';
config({ path: '.env.example' });

import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido al Chatbot de Sushi');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});