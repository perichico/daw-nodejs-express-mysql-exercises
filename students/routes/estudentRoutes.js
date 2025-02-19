const express = require('express');
const router = express.Router();
const estudentController = require('../controllers/estudentController');

// Rutas de estudiantes
router.get('/students', estudentController.obtenerEstudiantes);
router.post('/students', estudentController.crearEstudiante);
router.delete('/students/:id', estudentController.borrarEstudiante);
router.get('/students/:id', estudentController.obtenerEstudainte);
router.get('/studentsbyage/:age', estudentController.obtenerEstudaintePorEdad);

// Rutas de cursos
router.get('/courses', estudentController.obtenerCursos);
router.post('/courses', estudentController.crearCurso);
router.delete('/courses/:id', estudentController.borrarCurso);
router.get('/courses/:id', estudentController.obtenerCurso);
router.get('/coursesbystudent/:id', estudentController.obtenerCursosPorEstudiante);

//Rutas estudianteCurso
router.post('/enroll', estudentController.asignarCursoAEstudiante);
router.delete('/enroll/:studentId/:courseId', estudentController.desasignarCursoAEstudiante);
router.get('/ranking/courses', estudentController.obtenerRankingCursos);

//Rutas marca
router.get('/brands', estudentController.obtenerMarcas);
router.post('/brands', estudentController.crearMarca);
router.delete('/brands/:cif', estudentController.eliminarMarca);


module.exports = router;
