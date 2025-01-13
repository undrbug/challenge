import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
    pregunta: {
        type: String,
        required: [true, "La pregunta es requerida"],
        trim: true,
    },
    respuesta: {
        type: String,
        required: [true, "La respuesta es requerida"],
        trim: true,
    },
});

const Faq = mongoose.model("Faq", FaqSchema);

export default Faq;
