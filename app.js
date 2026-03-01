require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes/routes');
const contactosRouter = require('./routes/contactos');
const authRouter = require('./routes/auth');
const session = require('express-session');
const csrf = require('@dr.pogodin/csurf');

const app = express();

// Configuración de Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000 // 15 minutos
  }
}));

// Servir archivos estáticos
const staticPath = process.env.STATIC_PATH || 'public';
app.use(express.static(path.join(__dirname, staticPath)));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware CSRF
app.use(csrf({ cookie: true }));

// Hacer el token CSRF disponible en todas las vistas
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Registro de rutas
app.use('/', routes);
app.use('/contactos', contactosRouter);
app.use('/auth', authRouter);

// Manejador de errores CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403);
    res.render('error', { message: 'Formulario manipulado o sesión expirada.', error: {} });
  } else {
    next(err);
  }
});

// Captura de errores 404 y reenvío al manejador de errores
app.use((req, res, next) => {
  next(createError(404));
});
// Manejador de errores
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
