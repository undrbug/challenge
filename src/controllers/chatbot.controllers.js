import Faq from "../models/faq.js";
import Producto from "../models/producto.js";
import { connectDB, disconnectDB } from "../config/db.js";

const mostrarMenu = ["mostrar menu", "mostrar menú", "ver menú", "ver menu", "tengo hambre", "que hay para comer", "que hay para cenar", "que hay para almorzar", "que hay para merendar", "que hay para merendar", "no quiero cocinar", "menu"];

const estanAbiertos = ["estan abiertos", "a que hora abren", "horarios de apertura", "cuando abren", "estan cerrados", "a que hora cierran", "horas de operacion", "abren hoy", "horas de servicio", "horarios"];

const chatBotController = {
    //Primer intento, no me convence.
    processMessage0: async (req, res) => {
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
            console.log("Conectando a la base de datos y procesando el mensaje");
            connectDB();
            const responseMessage = await Faq.find({ pregunta: mensaje });
            if (!responseMessage) {
                return res.status(404).json({
                    success: false,
                    error: "No se encontro una respuesta para el mensaje proporcionado.",
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
    },
    //Segundo intento.
    processMessage1: async (req, res) => {
        const { message } = req.body;
    
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "El mensaje es requerido.",
            });
        }
    
        try {
            let responseText;
            connectDB();
            // if (message.toLowerCase().includes("mostrar menu")) {
            if (mostrarMenu.some(keys => message.toLowerCase().includes(keys))) {
                //Buscamos productos o menu de la bd
                const productos = await Producto.find();
                if (productos.length === 0) {
                    responseText = "El menú está vacío por ahora.";
                } else {
                    responseText = `Mirá, acá está el menú: \ `;
                    productos.forEach((producto, index) => {
                        responseText += `${index + 1}. ${producto.nombre} - ${producto.precio}`;
                    });
                }
            } else if (estanAbiertos.some(keys => message.toLowerCase().includes(keys))) {
                // miramos la hora actual y respondemos si estamos abiertos o no
                const currentHour = new Date().getHours();
                if (currentHour >= 11 && currentHour <= 23) {
                    responseText = "¡Sí, estamos abiertos! Nuestro horario es de 11hs a 23hs.";
                } else {
                    responseText = "Lo siento, estamos cerrados. Nuestro horario es de 11hs a 23hs.";
                }
            } else {
                responseText = "Lo siento, no entiendo ese comando. Prueba con 'mostrar menú'.";
                const faqs = await Faq.find();
                const faqResponse = faqs.find((faq) => message.toLowerCase().includes(faq.pregunta));
                if (faqResponse) {
                    responseText = faqResponse ? faqResponse : "Lo siento, pero no tenemos respuesta a tu pregunta.";
                }
                res.status(200).json({
                    success: "nderacore",
                    message: faqResponse,
                });
            }
            // res.status(200).json({
            //     success: true,
            //     message: responseText,
            // });
        } catch (error) {
            console.error("Error en el chatbot:", error.message);
            res.status(500).json({
                success: false,
                message: "Hubo un problema al procesar el mensaje.",
            });
        } finally {
            console.log("Cerrando conexión a la base de datos.");
            // disconnectDB();
        }
    }
}

export default chatBotController;