/**
 * carga la funcionalidad de http
 */
const http = require("http");
/**
 * carga toda la funcionalidad de app
 */
const app = require("./app");
/**
 * Crear el servidor
 */
const server = http.createServer(app);

/**
 * puerto para atender peticiones
 */
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// servidor en modo escucha
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});