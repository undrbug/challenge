import Producto from '../models/producto.js';

const productosController = {
    getMenu: async (req, res) => {
        try {
            const productos = await Producto.find({disponible: true});
            res.json(productos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el menú' });
        }
    }
}

export default productosController;