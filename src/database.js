const mongoose = require('mongoose');

const URI = 'mongodb://localhost/notejs'; // Cambia esta URI si es necesario

mongoose.connect(URI) // Conexión sin opciones obsoletas
    .then(() => console.log('Database is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;