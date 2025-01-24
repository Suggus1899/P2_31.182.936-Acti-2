const express = require('express');
const router = express.Router();
const ContactosController = require('../controllers/ContactosController');

// Ruta para la página de inicio
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio' });
});

// Ruta para la página "Sobre nosotros"
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Sobre Nosotros' });
});

// Ruta para la página de mantenimiento
router.get('/maintenance', function(req, res, next) {
  res.render('maintenance', { title: 'Mantenimiento Preventivo' });
});

// Ruta para la página de reparaciones
router.get('/repairs', function(req, res, next) {
  res.render('repairs', { title: 'Reparaciones Mecánicas' });
});

// Ruta para la página de neumáticos
router.get('/tires', function(req, res, next) {
  res.render('tires', { title: 'Servicio de Neumáticos' });
});

// Ruta para la página de contacto
router.post('/contact', ContactosController.add);

// Ruta para la página de usuarios (ejemplo)
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// Ruta para la página de agradecimiento
router.get('/thanks', function(req, res, next) {
  res.render('thanks', { title: 'Gracias' });
});

module.exports = router;
