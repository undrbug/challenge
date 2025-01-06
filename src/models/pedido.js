import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
    cliente: {
        nombre: {
            type: String,
            required: [true, "El nombre del cliente es requerido"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "El email del cliente es requerido"],
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Por favor ingrese un email válido",
            ],
        },
        telefono: {
            type: String,
            required: false,
            trim: true,
        },
    },
    productos: [
        {
            productoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
                required: true,
            },
            nombre: {
                type: String,
                required: true,
                trim: true,
            },
            cantidad: {
                type: Number,
                required: true,
                min: [1, "La cantidad mínima es 1"],
            },
            precioUnitario: {
                type: Number,
                required: true,
                min: [0, "El precio no puede ser negativo"],
            },
        },
    ],
    total: {
        type: Number,
        required: true,
        min: [0, "El total no puede ser negativo"],
    },
    estado: {
        type: String,
        enum: ["Pendiente", "Preparando", "Entregado", "Cancelado"],
        default: "Pendiente",
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
});

const Pedido = mongoose.model("Pedido", PedidoSchema);

export default Pedido;
