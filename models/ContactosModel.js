const sqlite3 = require('sqlite3').verbose();

class ContactosModel {
  constructor() {
    this.db = new sqlite3.Database('./database/contactos.db', (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
      } else {
        console.log('Conectado a la base de datos SQLite.');
        this.crearTabla();
      }
    });
  }

  crearTabla() {
    const sql = `CREATE TABLE IF NOT EXISTS contactos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      email TEXT,
      mensaje TEXT,
      ip TEXT,
      fecha_hora TEXT
    )`;
    this.db.run(sql, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      } else {
        console.log("Tabla 'contactos' creada o ya existe.");
      }
    });
  }

  guardarDatos(nombre, email, mensaje, ip, fecha_hora, callback) {
    const sql = `INSERT INTO contactos (nombre, email, mensaje, ip, fecha_hora) VALUES (?, ?, ?, ?, ?)`;
    this.db.run(sql, [nombre, email, mensaje, ip, fecha_hora], function (err) {
      if (err) {
        console.error('Error al insertar datos:', err.message);
        callback(err);
        return;
      }
      console.log('Datos insertados correctamente:', { nombre, email, mensaje, ip, fecha_hora });
      callback(null);
    });
  }

  recuperarDatos(callback) {
    const sql = `SELECT * FROM contactos`;
    this.db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error al recuperar datos:', err.message);
        callback(err);
        return;
      }
      console.log('Datos recuperados correctamente:', rows);
      callback(null, rows);
    });
  }
}

module.exports = ContactosModel;