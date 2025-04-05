const router = require('express').Router(); // Importar el módulo express

router.get('/notes', (req, res) => {
    res.send('Notas desde DB') // Ruta de las notas
});

module.exports = router; // Exportar el enrutador

