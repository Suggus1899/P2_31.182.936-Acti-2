const express = require('express');
const router = express.Router();
const ContactosController = require('../controllers/ContactosController');

// Ruta para agregar un contacto
router.post('/add', ContactosController.add);

// Ruta de prueba para la geolocalización por IP
router.get('/test-ip', async (req, res) => {
  const ip = '8.8.8.8'; // IP de prueba (Google DNS)
  const country = await ContactosController.getCountryByIp(ip); 
  res.json({ ip, country });
});

module.exports = router;
