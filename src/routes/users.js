const router = require('express').Router(); // Importar el módulo express

const User = require('../models/User'); // Importar el modelo de usuario

const passport = require('passport');


router.get('/users/signin', (req, res) => {
    res.render('users/signin') // Ruta de la página de inicio de sesión
});

router.post('/users/signin', passport.authenticate('local', {successRedirect: '/notes',
    failureRedirect: '/users/signin', failureFlash: true})); // Autenticación de usuario con passport

router.get('/users/signup', (req, res) => {
    res.render('users/signup') // Ruta de la página de registro
});

router.post('/users/signup', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = []; // Inicializar un array de errores
    if(name.length <= 0) {
        errors.push({text: 'Please insert your name'})
    }
    if(password !== confirm_password) {
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});// Renderizar la vista de registro con errores
    }
    else {
        const emailUser = await User.findOne({email: email}); // Buscar si el correo electrónico ya existe en la base de datos
        if(emailUser) {
            req.flash('error_msg', 'The email is already in use'); // Mensaje de error si el correo electrónico ya está en uso
            return res.redirect('/users/signup'); // Redirigir a la página de registro
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password); // Cifrar la contraseña
        await newUser.save(); // Guardar el nuevo usuario en la base de datos
        req.flash('success_msg', 'You are registered'); // Mensaje de éxito'
        res.redirect('/users/signin'); // Redirigir a la página de inicio de sesión
    }
});

router.get('/users/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Manejar el error si ocurre
        }
        res.redirect('/'); // Redirigir a la página principal
    });
});


module.exports = router; // Exportar el enrutador

