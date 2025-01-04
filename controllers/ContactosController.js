const { ContactosModel, getCountryByIp } = require('../models/ContactosModel');
const model = new ContactosModel(); // Instancia única de la clase ContactosModel
const moment = require('moment-timezone');

const ContactosController = {
  add: async function(req, res) {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const comentario = req.body.comentario;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const fecha_hora = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

    if (!nombre || !email || !comentario) {
      console.error("Error: Todos los campos son obligatorios.");
      res.status(400).json({ message: "Todos los campos son obligatorios." });
      return;
    }

    try {
      const country = await getCountryByIp(ip);
      model.guardarDatos(nombre, email, comentario, ip, fecha_hora, country, (err) => {
        if (err) {
          console.error("Error al guardar los datos:", err.message);
          res.status(500).json({ message: "Error al guardar los datos." });
          return;
        }
        console.log("Datos guardados correctamente:", { nombre, email, comentario, ip, fecha_hora, country });
        res.status(200).json({ message: "Datos guardados correctamente." });
      });
    } catch (error) {
      console.error("Error al obtener el país:", error.message);
      res.status(500).json({ message: "Error al obtener el país." });
    }
  },
  getCountryByIp 
};

module.exports = ContactosController;
