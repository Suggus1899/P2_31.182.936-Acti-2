const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/UserModel');
const ensureAdmin = require('../middlewares/ensureAdmin');

router.get('/options', (req, res) => {
    res.render('auth-options');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/contactos',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    UserModel.registrarUsuario(username, password, (err) => {
        if (err) {
            return res.status(500).send('Error al registrar usuario');
        }
        res.redirect('/auth/login');
    });
});

// Rutas para autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
        res.redirect('/contactos');
    });

// Ruta para mostrar el formulario de inicio de sesión de administrador
router.get('/admin', (req, res) => {
    res.render('admin-login');
});

// Ruta para procesar el inicio de sesión de administrador
router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/auth/admin',
    failureFlash: true
}));

// Rutas para autenticación con Google para administradores
router.get('/admin/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/admin/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/admin' }),
    (req, res) => {
        res.redirect('/admin/dashboard');
    });

// Ruta para mostrar los contactos al administrador
const contactos = [ /* aquí irían los datos reales de contactos */ ];

router.get('/admin/contactos', ensureAdmin, (req, res) => {
    res.render('admin-contactos', { contactos });
});

module.exports = router;
