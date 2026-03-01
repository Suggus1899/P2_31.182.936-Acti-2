const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

class UserModel {
  constructor() {
    this.db = new sqlite3.Database('./database/contactos.db', (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
      } else {
        console.log('Conectado a la base de datos SQLite.');
      }
    });
  }

  registrarUsuario(username, password, callback) {
    const password_hash = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO users (username, password_hash) VALUES (?, ?)`;
    this.db.run(sql, [username, password_hash], function(err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id: this.lastID });
    });
  }

  autenticarUsuario(username, password, callback) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    this.db.get(sql, [username], (err, row) => {
      if (err) {
        callback(err);
        return;
      }
      if (row && bcrypt.compareSync(password, row.password_hash)) {
        callback(null, row);
      } else {
        callback(new Error('Usuario o contraseña incorrectos'));
      }
    });
  }
}

module.exports = new UserModel();
