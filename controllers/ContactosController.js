const ContactosModel = require('../models/ContactosModel');
const model = new ContactosModel();

const ContactosController = {
  add: function(req, res) {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const mensaje = req.body.mensaje;
    const ip = req.ip;
    const fecha_hora = new Date().toISOString();

    // Validar los datos del formulario
    if (!nombre || !email || !mensaje) {
      console.error("Error: Todos los campos son obligatorios.");
      res.status(400).send("Todos los campos son obligatorios.");
      return;
    }

    // Llamar al método guardarDatos del modelo
    model.guardarDatos(nombre, email, mensaje, ip, fecha_hora, (err) => {
      if (err) {
        console.error("Error al guardar los datos:", err.message);
        res.status(500).send("Error al guardar los datos.");
        return;
      }
      console.log("Datos guardados correctamente:", { nombre, email, mensaje, ip, fecha_hora });
      res.redirect('/gracias');
    });
  }
};

module.exports = ContactosController;
