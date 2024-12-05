const app = require('./app'); // Asegúrate de que 'app' está en el mismo directorio
const http = require('http');

const port = process.env.PORT || 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Manejo de errores específicos con mensajes amigables
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requiere permisos elevados`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} ya está en uso`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
