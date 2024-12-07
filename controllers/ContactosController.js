const ContactosModel = require('../models/ContactosModel');
const model = new ContactosModel();

const ContactosController = {
  add: function(req, res) {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const comentario = req.body.comentario;
    const ip = req.ipInfo.ip; // Obtener la dirección IP real del cliente
    const fecha_hora = new Date().toISOString();

    if (!nombre || !email || !comentario) {
      console.error("Error: Todos los campos son obligatorios.");
      res.status(400).json({ message: "Todos los campos son obligatorios." });
      return;
    }

    model.guardarDatos(nombre, email, comentario, ip, fecha_hora, (err) => {
      if (err) {
        console.error("Error al guardar los datos:", err.message);
        res.status(500).json({ message: "Error al guardar los datos." });
        return;
      }
      console.log("Datos guardados correctamente:", { nombre, email, comentario, ip, fecha_hora });
      res.status(200).json({ message: "Datos guardados correctamente." });
    });
  }
};

module.exports = ContactosController;
