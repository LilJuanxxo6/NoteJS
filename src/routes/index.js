const router = require('express').Router(); // Importar el módulo express


router.get('/', (req, res) => {
 res.send('Index')}); // Ruta principal

router.get('/about', (req, res) => {
    res.send('About')}
); // Ruta de la página de información

module.exports = router; // Exportar el enrutador

