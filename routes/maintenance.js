const express = require('express');
const router = express.Router();

/* GET maintenance page. */
router.get('/maintenance', function(req, res, next) {
  res.render('maintenance', { title: 'Mantenimiento Preventivo' });
});

module.exports = router;
