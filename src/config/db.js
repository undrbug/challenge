import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1); // termina si hay un error en la conexion
  }
};

const disconnectDB = async () => {
  if (mongoose.connection) {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB.');
  }
}

export { connectDB, disconnectDB };