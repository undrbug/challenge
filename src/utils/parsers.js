function parseProductos(message) {
    const lines = message.split("\n");
    //crear un array de productos separados por una , y un espacio
    const productosArr = lines.map(line => line.trim().split(", "));
    const productos = lines.map((line) => {
        const [nombre, cantidad] = line.split(":").map((item) => item.trim());
        return {
            nombre,
            cantidad: parseInt(cantidad, 10),
        };
    }).filter((producto) => producto.nombre && producto.cantidad);
    console.log(productos);
    return productos;
}

function parseCliente(message) {
    const [nombre, email, telefono] = message.split(",").map((item) => item.trim());
    if (nombre && email && telefono) {
        return { nombre, email, telefono };
    }
    return null;
}

export { parseProductos, parseCliente };