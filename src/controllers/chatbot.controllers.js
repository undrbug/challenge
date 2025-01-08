import Faq from "../models/faq.js";
import { connectDB, disconnectDB } from "../config/db.js";

const chatBotMessage = {
    processMessage: async (req, res) => {
        const { message } = req.body;
        const mensaje = message.toLowerCase();
        const mensajeSinEspacios = mensaje.replace(/\s+/g, '');
        console.log(mensaje);
        if (!mensaje) {
            return res.status(400).json({
                success: false,
                error: "Debe proporcionar un mensaje.",
            });
        }
        try {
            // let response;


            console.log("Conectando a la base de datos y procesando el mensaje");
            connectDB();
            const responseMessage = await Faq.find({ pregunta: mensaje });
            if (!responseMessage) {
                return res.status(404).json({
                    success: false,
                    error: "No se encontró una respuesta para el mensaje proporcionado.",
                });
            }
            res.status(200).json({
                success: true,
                response: responseMessage.length > 0 ? responseMessage[0].respuesta : "No se encontró una respuesta para el mensaje proporcionado.",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: "Error al procesar el mensaje, intente nuevamente.",
            });
        } finally {
            console.log("Cerrando conexión a la base de datos.");
            disconnectDB();
        }
    }
}

export default chatBotMessage;