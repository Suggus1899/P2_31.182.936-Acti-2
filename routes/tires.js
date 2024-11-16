const express = require('express');
const router = express.Router();

/* GET tires page. */
router.get('/tires', function(req, res, next) {
  res.render('tires', { title: 'Servicio de Neumáticos' });
});

module.exports = router;
