const router = require('express').Router(); // Importar el módulo express


router.get('/', (req, res) => {
 res.render('index')}); // Ruta principal

router.get('/about', (req, res) => {
    res.render('about')}
); // Ruta de la página de información

module.exports = router; // Exportar el enrutador

