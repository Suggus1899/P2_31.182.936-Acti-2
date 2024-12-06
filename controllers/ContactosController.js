const ContactosModel = require('../models/ContactosModel');
const model = new ContactosModel();

const ContactosController = {
  add: function(req, res) {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const comentario = req.body.comentario;
    const ip = req.ip; // Obtener la dirección IP del usuario
    const fecha_hora = new Date().toISOString(); // Obtener la fecha y hora actuales

    // Validar los datos del formulario
    if (!nombre || !email || !comentario) {
      console.error("Error: Todos los campos son obligatorios.");
      res.status(400).send("Todos los campos son obligatorios.");
      return;
    }

    // Llamar al método guardarDatos del modelo
    model.guardarDatos(nombre, email, comentario, ip, fecha_hora, (err) => {
      if (err) {
        console.error("Error al guardar los datos:", err.message);
        res.status(500).send("Error al guardar los datos.");
        return;
      }
      console.log("Datos guardados correctamente:", { nombre, email, comentario, ip, fecha_hora });
      res.redirect('/gracias');
    });
  }
};

module.exports = ContactosController;
