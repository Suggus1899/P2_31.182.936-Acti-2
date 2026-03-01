const express = require('express');
const router = express.Router();
const ContactosController = require('../controllers/ContactosController');

// Ruta para la página de inicio
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Inicio' });
});

// Ruta para la página "Sobre nosotros"
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'Sobre Nosotros' });
});

// Ruta para la página de mantenimiento
router.get('/maintenance', function (req, res, next) {
  res.render('maintenance', { title: 'Mantenimiento Preventivo' });
});

// Ruta para la página de reparaciones
router.get('/repairs', function (req, res, next) {
  res.render('repairs', { title: 'Reparaciones Mecánicas' });
});

// Ruta para la página de neumáticos
router.get('/tires', function (req, res, next) {
  res.render('tires', { title: 'Servicio de Neumáticos' });
});

// Ruta para la página de galería
router.get('/gallery', function (req, res, next) {
  res.render('gallery', { title: 'Galería de Proyectos' });
});

// Ruta para la página de promociones
router.get('/promotions', function (req, res, next) {
  res.render('promotions', { title: 'Promociones' });
});

// Ruta para la página de blog
router.get('/blog', function (req, res, next) {
  res.render('blog', { title: 'Blog' });
});

// Ruta para la página de garantías
router.get('/guarantees', function (req, res, next) {
  res.render('guarantees', { title: 'Garantías' });
});

// Ruta para el cotizador
router.get('/quote', function (req, res, next) {
  res.render('quote', { title: 'Cotizador en Línea' });
});

// Ruta para agendar cita
router.get('/appointment', function (req, res, next) {
  res.render('appointment', { title: 'Agendar Cita' });
});

// --- SERVICIOS DETALLADOS ---
router.get('/diagnosis', (req, res) => res.render('diagnosis', { title: 'Diagnóstico Computarizado' }));
router.get('/ac-service', (req, res) => res.render('ac-service', { title: 'Aire Acondicionado' }));
router.get('/brakes', (req, res) => res.render('brakes', { title: 'Frenos' }));

// --- HERRAMIENTAS INTERACTIVAS ---
router.get('/fuel-calculator', (req, res) => res.render('fuel-calculator', { title: 'Calculadora de Combustible' }));
router.get('/maintenance-reminder', (req, res) => res.render('maintenance-reminder', { title: 'Recordatorio de Mantenimiento' }));

// --- CREDIBILIDAD ---
router.get('/success-stories', (req, res) => res.render('success-stories', { title: 'Casos de Éxito' }));
router.get('/reviews', (req, res) => res.render('reviews', { title: 'Testimonios' }));
router.get('/media', (req, res) => res.render('media', { title: 'En los Medios' }));

// --- E-COMMERCE ---
router.get('/shop', (req, res) => res.render('shop', { title: 'Tienda de Accesorios' }));
router.get('/parts', (req, res) => res.render('parts', { title: 'Venta de Repuestos' }));

// Ruta para la página de usuarios (ejemplo)
router.get('/users', function (req, res, next) {
  res.send('respond with a resource');
});

// Ruta para la página de agradecimiento
router.get('/thanks', function (req, res, next) {
  res.render('thanks', { title: 'Gracias' });
});

module.exports = router;
