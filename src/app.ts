import "dotenv/config"; // Cargar las variables de entorno desde el archivo .env

import { Server } from "./server"; // Importar la clase Server

// Crear una nueva instancia de la clase Server
const server: Server = new Server();

// Iniciar el servidor
server.listen();
