const express = require('express');
const path = require('path');
const { create } = require('express-handlebars'); // Motor de plantillas
const methodOverride = require('method-override'); // Middleware para sobreescribir el método de la petición
const session = require('express-session'); // Middleware para manejar sesiones
const llamadoDB = './database'; // Conexión a la base de datos


// Initiliazations
const app = express();
require(llamadoDB); // Conexión a la base de datos

// Settings = Motor de platillas, donde estan la vista, aplicación general
app.set('port', process.env.PORT || 3000); //Si existe puerto en mi pc use si no use el 3000
app.set('views', path.join(__dirname, 'views')); //Ruta de las vistas

const exphbs = create({
  defaultLayout: 'main', //Nombre del layout principal
  layoutsDir: path.join(app.get('views'), 'layouts'), //Ruta de los layouts
  partialsDir: path.join(app.get('views'), 'partials'), //Ruta de los parciales
  extname: '.hbs' //Extensión de los archivos de las vistas
}); //Crear el motor de plantillas

app.engine('.hbs', exphbs.engine); //Registrar el motor de plantillas

app.set('view engine', '.hbs'); //Configuración del motor de plantillas

// Middleware

app.use(express.urlencoded({extended: false})); //Middleware para recibir datos del formulario Como correo
app.use(methodOverride('_method')); //Middleware para sobreescribir el método de la petición
app.use(session({
    secret: 'mysecretapp', //Clave secreta para encriptar la sesión
    resave : true, //Reiniciar la sesión si no ha cambiado
    saveUninitialized: true //Guardar la sesión si no ha cambiado
})); //Middleware para manejar sesiones

// Global Variables

// Routes

app.use(require('./routes/index')); //Ruta principal
app.use(require('./routes/notes')); //Ruta de las notas
app.use(require('./routes/users')); //Ruta de los usuarios

// Static Files

app.use(express.static(path.join(__dirname, 'public'))); //Ruta de los archivos estáticos

// Server is listenning
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

