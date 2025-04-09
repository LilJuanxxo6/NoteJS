module.exports = {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { // Verificar si el usuario está autenticado
            return next(); // Continuar con la siguiente función middleware o ruta
        }
        req.flash('error_msg', 'Not authorized'); // Mensaje de error
        res.redirect('/users/signin'); // Redirigir a la página de inicio de sesión
    }
};