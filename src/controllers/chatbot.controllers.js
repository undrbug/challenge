import Faq from "../models/faq.js";
import Producto from "../models/producto.js";
import Pedido from "../models/pedido.js";
import Cliente from "../models/cliente.js";
import { connectDB, disconnectDB } from "../config/db.js";
import { parseProductos } from "../utils/parsers.js";

const comandos = {
	mostrarMenu: [
		"mostrar menu",
		"mostrar menú",
		"ver menú",
		"ver menu",
		"tengo hambre",
		"que hay para comer",
		"que hay para cenar",
		"que hay para almorzar",
		"que hay para merendar",
		"que hay para merendar",
		"no quiero cocinar",
		"menu",
	],
	estanAbiertos: [
		"estan abiertos",
		"a que hora abren",
		"horarios de apertura",
		"cuando abren",
		"estan cerrados",
		"a que hora cierran",
		"horas de operacion",
		"abren hoy",
		"horas de servicio",
		"horarios",
	],
	hacerPedido: [
		"hacer pedido",
		"quiero hacer el pedido",
		"quiero pedir",
		"quiero ordenar",
		"quiero comprar",
		"quiero comer",
		"quiero cenar",
		"quiero almorzar",
		"quiero merendar",
	],
};

const chatBotController = {
	processMessage: async (req, res) => {
		const { message } = req.body;
		if (!message) {
			return res.status(400).json({
				success: false,
				message: "El mensaje es requerido.",
			});
		}

		try {
			let responseText =
				"No entiendo el mensaje. Prueba con: 'mostrar menú', 'hacer pedido' o '¿están abiertos?'";
			await connectDB();

			const lowerMessage = message.toLowerCase();

			//mostrar menu
			if (
				comandos.mostrarMenu.some((cmd) => lowerMessage.includes(cmd))
			) {
				const productos = await Producto.find({ disponible: true });
				responseText = productos.length
					? productos
							.map(
								(p, i) => `${i + 1}. ${p.nombre} - $${p.precio}`
							)
							.join("\n")
					: "El menú está vacío por ahora.";
			}
			//verificamos los horaios
			else if (
				comandos.estanAbiertos.some((cmd) => lowerMessage.includes(cmd))
			) {
				const currentHour = new Date().getHours();
				responseText =
					currentHour >= 11 && currentHour <= 23
						? "¡Sí, estamos abiertos! Nuestro horario es de 11hs a 23hs."
						: "Lo siento, estamos cerrados. Nuestro horario es de 11hs a 23hs.";
			}
			//realizar pedido
			else if (
				comandos.hacerPedido.some((cmd) => lowerMessage.includes(cmd))
			) {
				// Paso inicial para realizar un pedido
				//elimino el cmd del mensaje
				const pedido = message.split("\n").slice(1);
				//convierto el pedido en un array
				const productosArray = pedido.join(",").split(",");
				//creo un objeto con el pedido

				if (productosArray.length === 0) {
					responseText =
						"Por favor, especifica los productos y cantidades en el formato 'Producto: Cantidad'.";
				} else {
					// Preparar el pedido
					const productoObj = productosArray.map((p) => {
						const producto = p.trim();
						const [nombre, cantidad] = p.split(":");
						const productoObj = {
							nombre: nombre.trim(),
							cantidad: parseInt(cantidad),
						};
						return productoObj;
					});
					console.log("producto dentro del map", productoObj);
					// Validar productos
					const nombresProductos = productoObj.map((p) => p.nombre);
					const productosEncontrados = await Producto.find({
						nombre: {
							$in: nombresProductos.map(
								(n) => new RegExp(`^${n}$`, "i")
							),
						},
						disponible: true,
					});

					if (productosEncontrados.length !== productoObj.length) {
						responseText =
							"Algunos productos no están disponibles en el menú. Verifica los nombres.";
					} else {
						// Calcular el total y registrar el pedido
						const total = productoObj.reduce((sum, p) => {
							const producto = productosEncontrados.find(
								(prod) => prod.nombre === p.nombre
							);
							return sum + producto.precio * p.cantidad;
						}, 0);

						// Simulación de cliente (en producción) con id 677b4bde1d179af5351af73a
						const cliente = await Cliente.findById(
							"677d91ad1d179af5351af749"
						);
                        console.log(cliente);
						if (!cliente) {
							responseText =
								"No se encontró un cliente para registrar el pedido.";
						} else {
							const nuevoPedido = new Pedido({
								cliente: cliente._id,
								productos: productoObj,
								total,
							});

							await nuevoPedido.save();
							responseText = `Pedido registrado con éxito. Total a pagar: $${total.toFixed(
								2
							)}.`;
						}
					}
				}
			}

			res.status(200).json({ success: true, message: responseText });
		} catch (error) {
			console.error("Error en el chatbot:", error.message);
			res.status(500).json({
				success: false,
				message: "Hubo un problema al procesar el mensaje.",
			});
		} finally {
			await disconnectDB();
		}
	},
};

export default chatBotController;
