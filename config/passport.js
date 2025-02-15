const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/UserModel');

// Autenticación local
passport.use(new LocalStrategy((username, password, done) => {
    UserModel.autenticarUsuario(username, password, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Usuario o contraseña incorrectos' });
        return done(null, user);
    });
}));

// Autenticación con Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    UserModel.findOrCreateGoogleUser(profile, (err, user) => {
        return done(err, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.getUserById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;
