const http = require("http");
const app = require("./app"); // Importer notre app Express

app.set("port", process.env.PORT || 3000); // Le port dans laquelle l'apllication Express doit tourner
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
