const router = require('express').Router(); // Importar el módulo express

const Note = require('../models/Note'); // Importar el modelo de nota

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note'); // Renderizar la vista de agregar nota
});

router.post('/notes/new-note', async (req, res) => {
    const { title, description } = req.body;
    const errors = []; // Inicializar un array de errores
    if(!title){
        errors.push({text: 'Por favor ingrese un título'}); // Agregar error si no hay título
    }
    if(!description){
        errors.push({text: 'Por favor ingrese una descripción'}); // Agregar error si no hay descripción
    }
    if(errors.length > 0){ // Si hay errores
        res.render('notes/new-note', { // Renderizar la vista de agregar nota con errores
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description }); // Crear una nueva nota
        await newNote.save(); // Guardar la nueva nota en la base de datos AWAIT se usa para esperar la respuesta por ser petición asincrona
        res.redirect('/notes'); // Redirigir a la ruta de notas
    }
});

router.get('/notes', (req, res) => {
    res.send('Notas desde DB') // Ruta de las notas
});

module.exports = router; // Exportar el enrutador

