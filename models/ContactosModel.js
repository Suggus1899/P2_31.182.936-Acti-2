const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const moment = require('moment-timezone');

const ipstackKey = process.env.IPSTACK_API_KEY;

class ContactosModel {
  constructor() {
    this.db = new sqlite3.Database(process.env.DATABASE_PATH || './database/contactos.db', (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
      } else {
        console.log('Conectado a la base de datos SQLite.');
      }
    });
  }

  guardarDatos(nombre, email, comentario, ip, fecha_hora, country, callback) {
    const sql = `INSERT INTO contactos (nombre, email, comentario, ip, fecha_hora, pais) VALUES (?, ?, ?, ?, ?, ?)`;
    this.db.run(sql, [nombre, email, comentario, ip, fecha_hora, country], function (err) {
      if (err) {
        console.error('Error al insertar datos:', err.message);
        callback(err);
        return;
      }
      console.log('Datos insertados correctamente:', { nombre, email, comentario, ip, fecha_hora, country });
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

const getCountryByIp = async (ip) => {
  if (ip === '127.0.0.1' || ip === '::1') {
    return 'Localhost'; 
  }
  try {
    const response = await axios.get(`https://api.ipstack.com/${ip}?access_key=${ipstackKey}`);
    return response.data.country_name;
  } catch (error) {
    console.error('Error al obtener el país por IP:', error.message);
    return null;
  }
};

module.exports = { ContactosModel, getCountryByIp };
