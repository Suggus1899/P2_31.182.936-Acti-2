const sqlite3 = require('sqlite3').verbose();

class ContactosModel {
  constructor() {
    this.db = new sqlite3.Database('./database/contactos.db', (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
      } else {
        console.log('Conectado a la base de datos SQLite.');
      }
    });
  }

  guardarDatos(nombre, email, mensaje, ip, fecha_hora, callback) {
    const sql = `INSERT INTO contactos (nombre, email, mensaje, ip, fecha_hora) VALUES (?, ?, ?, ?, ?)`;
    this.db.run(sql, [nombre, email, mensaje, ip, fecha_hora], function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  }

  recuperarDatos(callback) {
    const sql = `SELECT * FROM contactos`;
    this.db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }
}

module.exports = ContactosModel;
