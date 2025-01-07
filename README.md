# Chatbot Sushi

Este es un proyecto de un chatbot para pedir sushi, desarrollado como parte del Challenge Desarrollador Junior de Chatbots IA.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona el repositorio:

git clone https://github.com/undrbug/challenge.git

2. Navega al directorio del proyecto:

cd challenge

3. Instala las dependencias:

npm install

4. Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto y copia el contenido de .env.example:

cp .env.example .env

5. Modifica el archivo .env con tus propias configuraciones.


Uso
Para iniciar el servidor en modo desarrollo, ejecuta:

npm run dev

El servidor se ejecutará en http://localhost:3000.

Estructura del Proyecto:
src: código fuente del proyecto.

config/: Configuración de la base de datos (mongoDB).

controllers/: Controladores de las rutas.

data/: Archivos JSON con datos de ejemplo.

models/: Modelos de Mongoose.

routes/: Definición de las rutas.

server.js: Archivo principal del servidor.