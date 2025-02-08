const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

class UserModel {
    constructor() {
        this.db = new sqlite3.Database('./database/users.db', (err) => {
            if (err) {
                console.error('Error al conectar con la base de datos:', err.message);
            } else {
                console.log('Conectado a la base de datos SQLite.');
                this.crearTabla();
            }
        });
    }

    crearTabla() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password_hash TEXT,
                google_id TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.db.run(sql, (err) => {
            if (err) {
                console.error('Error al crear la tabla:', err.message);
            } else {
                console.log("Tabla 'users' creada o ya existe.");
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

    getUserById(id, callback) {
        const sql = `SELECT * FROM users WHERE id = ?`;
        this.db.get(sql, [id], (err, row) => {
            callback(err, row);
        });
    }

    findOrCreateGoogleUser(profile, callback) {
        const sqlFind = `SELECT * FROM users WHERE google_id = ?`;
        this.db.get(sqlFind, [profile.id], (err, row) => {
            if (err) {
                return callback(err);
            }
            if (row) {
                return callback(null, row);
            } else {
                const sqlInsert = `INSERT INTO users (username, google_id) VALUES (?, ?)`;
                this.db.run(sqlInsert, [profile.displayName, profile.id], function(err) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, { id: this.lastID, username: profile.displayName, google_id: profile.id });
                });
            }
        });
    }
}

module.exports = new UserModel();
