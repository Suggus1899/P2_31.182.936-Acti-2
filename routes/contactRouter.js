const express = require('express');
const router = express.Router();
const ContactosController = require('../controllers/ContactosController');

router.post('/contact', ContactosController.add);

module.exports = router;
