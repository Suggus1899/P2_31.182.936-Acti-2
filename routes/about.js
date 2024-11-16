const express = require('express');
const router = express.Router();

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Sobre Nosotros' });
});

module.exports = router;
