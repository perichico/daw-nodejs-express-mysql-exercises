const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.post('/nuevo', estudianteController.crearEstudiante);
router.get('/estudiante/:dni', estudianteController.obtenerEstudiante);
router.get('/estudiantes', estudianteController.listarEstudiantes);
router.delete('/borrar/:dni', estudianteController.borrarEstudiante);

module.exports = router;
