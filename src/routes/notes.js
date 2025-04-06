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
        req.flash('success_msg', 'Note Added Successfully'); // Mensaje de éxito
        res.redirect('/notes'); // Redirigir a la ruta de notas
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'}).lean(); // Obtener todas las notas de la base de datos y convertirlas a un objeto plano
    res.render('notes/all-notes', { notes }); // Renderizar la vista de todas las notas
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean(); // Obtener la nota por ID de la base de datos y convertirla a un objeto plano
    res.render('notes/edit-note', {note}); // Renderizar la vista de editar nota
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description}); // Actualizar la nota por ID en la base de datos
    req.flash('success_msg', 'Note Updated Successfully'); // Mensaje de éxito
    res.redirect('/notes'); // Redirigir a la ruta de notas
});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); // Eliminar la nota por ID de la base de datos
    req.flash('success_msg', 'Note Deleted Successfully'); // Mensaje de éxito
    res.redirect('/notes'); // Redirigir a la ruta de notas
});

module.exports = router; // Exportar el enrutador

