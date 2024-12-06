const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const maintenanceRouter = require('./routes/maintenance');
const repairsRouter = require('./routes/repairs');
const tiresRouter = require('./routes/tires');
const contactRouter = require('./routes/contactRouter');

const app = express();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Registro de rutas
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/maintenance', maintenanceRouter);
app.use('/repairs', repairsRouter);
app.use('/tires', tiresRouter);
app.use('/contact', contactRouter);

// Captura de errores 404 y reenvío al manejador de errores
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, next) => {
  // Configura las variables locales, solo proporcionando errores en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
