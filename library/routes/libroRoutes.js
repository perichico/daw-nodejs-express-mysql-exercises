const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

// Ruta para mostrar el formulario para agregar un libro
router.get('/nuevo', libroController.mostrarFormulario); 

// Ruta para agregar un nuevo libro
router.post('/nuevo', libroController.agregarLibro); 

// Ruta para ver todos los libros
router.get('/libros', libroController.listarLibros);

// Ruta para ver un libro por su ISBN
router.get('/libro/:isbn', libroController.verLibro); 

// Ruta para borrar un libro por su ISBN
router.post('/borrar/:isbn', libroController.borrarLibro); 

module.exports = router;
