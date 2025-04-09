const mongoose = require('mongoose');
const { Schema } = mongoose; // Desestructurar el objeto mongoose para obtener el constructor de esquemas
const bcrypt = require('bcryptjs'); // Importar bcryptjs para el cifrado de contraseñas


const UserSchema = new Schema({
    name: {type: String, required: true}, // Campo de nombre, requerido
    email: {type: String, required: true}, // Campo de correo electrónico, requerido
    password: {type: String, required: true}, // Campo de contraseña, requerido
    date: {type: Date, default: Date.now} // Campo de fecha, con valor por defecto de la fecha actual
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generar un salt con 10 rondas
    return bcrypt.hash(password, salt); // Cifrar la contraseña con el salt generado
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Compara la contraseña ingresada con la almacenada
};

module.exports = mongoose.model('User', UserSchema); // Exportar el modelo de usuario basado en el esquema definido