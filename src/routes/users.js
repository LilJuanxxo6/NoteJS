const router = require('express').Router(); // Importar el módulo express

router.get('/users/signin', (req, res) => {
    res.render('users/signin') // Ruta de la página de inicio de sesión
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup') // Ruta de la página de registro
});

module.exports = router; // Exportar el enrutador

