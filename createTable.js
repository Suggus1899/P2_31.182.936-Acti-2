const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/contactos.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT,
    mensaje TEXT,
    ip TEXT,
    fecha_hora TEXT
  )`);
});

db.close();
console.log("Tabla 'contactos' creada con éxito.");
