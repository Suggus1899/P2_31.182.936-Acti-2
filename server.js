// server.js

const app = require('./app'); // Asegúrate de que 'app' está en el mismo directorio
const http = require('http');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
