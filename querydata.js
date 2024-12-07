const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos
const db = new sqlite3.Database('./database/contactos.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Consultar todos los datos de la tabla contactos
db.all("SELECT * FROM contactos", [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

// Cerrar la conexión a la base de datos
db.close((err) => {
  if (err) {
    console.error('Error al cerrar la conexión a la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos cerrada.');
  }
});
