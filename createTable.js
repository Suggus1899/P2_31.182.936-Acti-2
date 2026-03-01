const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DATABASE_PATH || './database/contactos.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite para la creación de tablas.');
    createTables();
  }
});

function createTables() {
  const createContactosTableSql = `
    CREATE TABLE IF NOT EXISTS contactos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(50),
      email TEXT,
      comentario VARCHAR(100),
      ip TEXT,
      fecha_hora TEXT,
      pais VARCHAR(50)
    )
  `;

  const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.serialize(() => {
    db.run(createContactosTableSql, (err) => {
      if (err) {
        console.error('Error al crear la tabla "contactos":', err.message);
      } else {
        console.log("Tabla 'contactos' creada o ya existe.");
        // Después de crear la tabla, verificar y añadir la columna 'pais' si no existe
        db.run(`PRAGMA table_info(contactos);`, (err, rows) => {
          if (err) {
            console.error('Error al obtener información de la tabla contactos:', err.message);
            return;
          }
          const hasPaisColumn = rows.some(col => col.name === 'pais');
          if (!hasPaisColumn) {
            db.run(`ALTER TABLE contactos ADD COLUMN pais VARCHAR(50);`, (err) => {
              if (err) {
                console.error('Error al agregar la columna "pais":', err.message);
              } else {
                console.log("Columna 'pais' agregada a la tabla 'contactos'.");
              }
            });
          } else {
            console.log("La columna 'pais' ya existe en la tabla 'contactos'.");
          }
        });
      }
    });

    db.run(createUsersTableSql, (err) => {
      if (err) {
        console.error('Error al crear la tabla "users":', err.message);
      } else {
        console.log("Tabla 'users' creada o ya existe.");
      }
      db.close((closeErr) => {
        if (closeErr) {
          console.error('Error al cerrar la base de datos:', closeErr.message);
        } else {
          console.log('Base de datos cerrada.');
        }
      });
    });
  });
}
