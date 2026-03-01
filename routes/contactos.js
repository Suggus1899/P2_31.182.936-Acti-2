const express = require('express');
const router = express.Router();
const ContactosModel = require('../models/ContactosModel');
const ContactosController = require('../controllers/ContactosController');

// Middleware de autenticación
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
};

// Ruta para manejar el envío del formulario de contacto
router.post('/contact', ContactosController.add);

// Ruta autenticada para mostrar contactos
router.get('/', isAuthenticated, async (req, res) => {
  try {
    ContactosModel.recuperarDatos((err, contactos) => {
      if (err) {
        return res.status(500).send('Error al recuperar datos');
      }
      res.render('contactos', { contactos });
    });
  } catch (error) {
    res.status(500).send('Error al recuperar datos');
  }
});

module.exports = router;
