import Faq from "../models/faq.js";
import { connectDB, disconnectDB } from "../config/db.js";

const faqsController = {
    getFaqs: async (req, res) => {
        try {
            console.log("Conectando a la base de datos y obteniendo faqs frecuentes.");
            connectDB();
            const faqs = await Faq.find();
            res.status(200).json({
                success: true,
                count: faqs.length,
                data: faqs,
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: "Error al obtener las preguntas frecuentes, intente nuevamente.",
            });
            
        } finally {
            console.log("Cerrando conexión a la base de datos.");
            disconnectDB();
        }
    }
}

export default faqsController;