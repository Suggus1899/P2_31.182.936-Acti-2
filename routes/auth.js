const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Ruta de registro (solo accesible para administradores)
router.get('/register', ensureAuthenticated, (req, res) => {
  res.render('register');
});

router.post('/register', ensureAuthenticated, (req, res) => {
  const { username, password } = req.body;
  UserModel.registrarUsuario(username, password, (err, result) => {
    if (err) {
      return res.status(500).send('Error al registrar usuario');
    }
    res.redirect('/auth/login');
  });
});

// Ruta de login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  UserModel.autenticarUsuario(username, password, (err, user) => {
    if (err) {
      return res.status(401).send('Usuario o contraseña incorrectos');
    }
    req.session.user = user;
    res.redirect('/contactos');
  });
});

// Ruta de logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
