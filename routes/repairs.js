const express = require('express');
const router = express.Router();

/* GET repairs page. */
router.get('/repairs', function(req, res, next) {
  res.render('repairs', { title: 'Reparaciones Mecánicas' });
});

module.exports = router;
