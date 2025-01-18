const { ContactosModel } = require('../models/ContactosModel');
const { getCountryByIp } = require('../models/getCountryByIp');
const model = new ContactosModel(); 
const axios = require('axios');
const moment = require('moment-timezone');
const nodemailer = require('nodemailer');
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailRecipients = process.env.EMAIL_RECIPIENTS;

const ContactosController = {
  add: async function(req, res) {
    const { nombre, email, comentario, 'g-recaptcha-response': recaptchaResponse } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const fecha_hora = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

    // Verificar reCAPTCHA
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}&remoteip=${ip}`;
    try {
      const recaptchaResult = await axios.post(recaptchaUrl);
      if (!recaptchaResult.data.success) {
        console.error("Error: reCAPTCHA falló.");
        return res.status(400).json({ message: "Por favor, completa el reCAPTCHA." });
      }
    } catch (error) {
      console.error("Error al verificar reCAPTCHA:", error.message);
      return res.status(500).json({ message: "Error al verificar reCAPTCHA." });
    }

    if (!nombre || !email || !comentario) {
      console.error("Error: Todos los campos son obligatorios.");
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
      const country = await getCountryByIp(ip);
      if (!country) {
        console.error("Error: No se pudo obtener el país.");
        return res.status(500).json({ message: "No se pudo obtener el país." });
      }

      model.guardarDatos(nombre, email, comentario, ip, fecha_hora, country, (err) => {
        if (err) {
          console.error("Error al guardar los datos:", err.message);
          return res.status(500).json({ message: "Error al guardar los datos." });
        }
        console.log("Datos guardados correctamente:", { nombre, email, comentario, ip, fecha_hora, country });

        // Configurar el transporte de correo
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: emailUser,
            pass: emailPass
          }
        });

        // Configurar el contenido del correo electrónico
        const mailOptions = {
          from: emailUser,
          to: emailRecipients,
          subject: 'Nuevo mensaje de contacto',
          text: `
            Has recibido un nuevo mensaje de contacto:
            Nombre: ${nombre}
            Correo electrónico: ${email}
            Comentario: ${comentario}
            Dirección IP: ${ip}
            País: ${country}
            Fecha y hora: ${fecha_hora}`
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return res.status(500).json({ message: 'Error al enviar el correo electrónico.' });
          }
          console.log('Correo electrónico enviado:', info.response);
          return res.status(200).json({ message: 'Datos guardados y correo electrónico enviado correctamente.' });
        });
      });
    } catch (error) {
      console.error("Error al obtener el país:", error.message);
      return res.status(500).json({ message: "Error al obtener el país." });
    }
  }
};

module.exports = ContactosController;
