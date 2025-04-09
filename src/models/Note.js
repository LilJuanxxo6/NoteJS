const mongoose = require('mongoose'); // Importar mongoose para la conexión a la base de datos
const { Schema } = mongoose; // Desestructurar el objeto Schema de mongoose

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Establecer la fecha por defecto como la fecha actual
    },
    user: {type: String}
});

module.exports = mongoose.model('Note', NoteSchema); // Exportar el modelo de nota