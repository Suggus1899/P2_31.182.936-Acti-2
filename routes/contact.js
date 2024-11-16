const express = require('express');
const router = express.Router();

router.post('/contact', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  console.log(`Nombre: ${name}, Email: ${email}, Mensaje: ${message}`);

  res.send('Formulario enviado correctamente');
});

module.exports = router;
