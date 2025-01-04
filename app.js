require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ip = require('express-ip');
const routes = require('./routes/routes');
const contactosRouter = require('./routes/contactos');

const app = express();

// Configuración del motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Servir archivos estáticos
const staticPath = process.env.STATIC_PATH || 'public';
app.use(express.static(path.join(__dirname, staticPath)));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(ip().getIpInfoMiddleware);

// Registro de rutas
app.use('/', routes);
app.use('/contactos', contactosRouter);

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

console.log('IPSTACK_API_KEY:', process.env.IPSTACK_API_KEY);
