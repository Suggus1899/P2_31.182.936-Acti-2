const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true } // Campo para autenticación con Google
});

// Método para registrar usuario
UserSchema.statics.registrarUsuario = async function(username, password, callback) {
    const hash = await bcrypt.hash(password, 10);
    const user = new this({ username, password: hash });
    user.save(callback);
};

// Método para autenticar usuario
UserSchema.statics.autenticarUsuario = function(username, password, callback) {
    this.findOne({ username }, async (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(null, false);
        const isMatch = await bcrypt.compare(password, user.password);
        return callback(null, isMatch ? user : false);
    });
};

// Método para encontrar o crear un usuario con Google
UserSchema.statics.findOrCreateGoogleUser = function(profile, callback) {
    this.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return callback(err);
        if (user) {
            return callback(null, user);
        } else {
            const newUser = new this({
                username: profile.displayName,
                googleId: profile.id
            });
            newUser.save(callback);
        }
    });
};

// Método para obtener usuario por ID
UserSchema.statics.getUserById = function(id, callback) {
    this.findById(id, callback);
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
