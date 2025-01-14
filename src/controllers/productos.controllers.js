import Producto from '../models/producto.js';
import {connectDB, disconnectDB} from '../config/db.js';

const productosController = {
    getMenu: async (req, res) => {
        try {
            await connectDB();
            //Filtramos los productos disponibles
            const productos = await Producto.find({disponible: true});
            res.status(200).json({
                success: true,
                count: productos.length,
                data: productos,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: "Error al obtener el menu, intente nuevamente.",
            });
        } finally {
            console.log("Cerrando conexión a la base de datos.");
            await disconnectDB();
        }
    }
}

export default productosController;