import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es requerido"],
        trim: true,
    },
    descripcion: {
        type: String,
        required: [true, "La descripción del producto es requerida"],
        trim: true,
    },
    precio: {
        type: Number,
        required: [true, "El precio del producto es requerido"],
    },
    categoria: {
        type: String,
        required: [true, "La categoría del producto es requerida"],
        trim: true,
    },
    imagenUrl: {
        type: String,
        required: [true, "La URL de la imagen del producto es requerida"],
        trim: true,
    },
    disponible: {
        type: Boolean,
        default: true,
    },
    vegano: {
        type: Boolean,
        default: false,
    },
    gluten: {
        type: Boolean,
        default: false,
    },
});

const Producto = mongoose.model("Producto", ProductSchema);

export default Producto;