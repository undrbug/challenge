import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del cliente es requerido"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "El email del cliente es requerido"],
        unique: true,
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
    direccion: {
        calle: {
            type: String,
            required: [true, "La calle es requerida"],
            trim: true,
        },
        numero: {
            type: String,
            required: [true, "El número es requerido"],
            trim: true,
        },
        ciudad: {
            type: String,
            required: [true, "La ciudad es requerida"],
            trim: true,
        },
        provincia: {
            type: String,
            required: [true, "La provincia es requerida"],
            trim: true,
        },
        codigoPostal: {
            type: String,
            required: [true, "El código postal es requerido"],
            trim: true,
        },
    },
    historialPedidos: [
        {
            pedidoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pedido",
            },
            fecha: {
                type: Date,
                required: true,
            },
        },
    ],
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});

const Cliente = mongoose.model("Cliente", ClienteSchema);

export default Cliente;
