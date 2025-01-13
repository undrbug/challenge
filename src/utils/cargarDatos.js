import mongoose from "mongoose";
import Producto from "./models/Producto.js"; 
import productos from "./data/productos.js"; 

const cargarProductos = async () => {
    try {
        await Producto.insertMany(productos);
        console.log("Productos cargados correctamente");
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

export default cargarProductos;
