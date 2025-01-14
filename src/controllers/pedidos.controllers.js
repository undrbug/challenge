import Pedido from "../models/pedido.js";
import { connectDB, disconnectDB } from "../config/db.js";
import Cliente from "../models/cliente.js";
import Producto from "../models/producto.js";

const pedidosController = {
	crearPedido: async (req, res) => {
		const { productos } = req.body;
        //Cliente de prueba (temporal)
        const cliente = await Cliente.findById("677d91ad1d179af5351af749");
		try {
			console.log(cliente, productos);
			// Validar los campos requeridos
			if (!cliente || !productos || productos.length === 0) {
				return res.status(400).json({
					success: false,
					message:
						"Debe proporcionar un cliente y al menos un producto.",
				});
			}

			// Validar que los productos enviados existen en la base de datos
			const nombreProductos = productos.map((p) => p.nombre);
			const productosEncontrados = await Producto.find({
				_id: { $in: nombreProductos },
			});

			if (productosEncontrados.length !== productos.length) {
				return res.status(400).json({
					error: "Uno o más productos no no aparecen en el menu.",
				});
			}

			// Calcular el total del pedido
			const total = productos.reduce(
				(acc, item) => acc + item.precio * item.cantidad,
				0
			);
			console.log("Conectado a la base de datos y creado el pedido");
			await connectDB();
			// Crear el pedido en la base de datos
			const nuevoPedido = new Pedido({
				cliente,
				productos,
				total,
			});
			console.log("guardando el pedido");
			const resNewPedido = await nuevoPedido.save();

			res.status(201).json({
				success: true,
				message: "Pedido creado exitosamente.",
				data: resNewPedido,
			});
		} catch (error) {
			console.error("Error al crear el pedido:", error.message);
			res.status(500).json({
				success: false,
				message: "Error al crear el pedido. Intente nuevamente.",
			});
		} finally {
			console.log("Cerrando conexión a la base de datos.");
			await disconnectDB();
		}
	},
	getPedidos: async (req, res) => {
		try {
			console.log(
				"conectandose a la base de datos y obteniendo los pedidos"
			);
			connectDB();
			const pedidos = await Pedido.find();
			res.status(200).json({
				success: true,
				count: pedidos.length,
				data: pedidos,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				error: "Error al obtener los pedidos, intente nuevamente.",
			});
		} finally {
			console.log("Cerrando conexión a la base de datos.");
			disconnectDB();
		}
	},
};

export default pedidosController;
