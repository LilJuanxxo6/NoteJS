const router = require('express').Router(); // Importar el módulo express

router.get('/users/signin', (req, res) => {
    res.send('Ingresando a la aplicación')
});

router.get('/users/signup', (req, res) => {
    res.send('Formulario de autenticación')
});

module.exports = router; // Exportar el enrutador

