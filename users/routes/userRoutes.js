const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//router.get('/', userController.index);

// Rutas de Usuarios
router.get('/usuarios', userController.obtenerUsuarios);
router.post('/usuarios', userController.crearUsuario);
router.get('/usuarios/:id', userController.obtenerUsuario);
router.delete('/usuarios/:id', userController.borrarUsuario);

// Rutas de Perfil
router.get('/perfiles', userController.obtenerPerfiles);
router.post('/perfiles', userController.crearPerfil);
router.get('/perfiles/:id', userController.obtenerPerfil);
router.put('/perfiles/:id', userController.actualizarPerfil);
router.delete('/perfiles/:id', userController.borrarPerfil);

//Consultas avanzadas
router.get('/usuarios/conperfiles', userController.obtenerUsuariosConPerfil);
router.get('/usuarios/noperfil', userController.obtenerUsuariosSinPerfil);
router.get('/perfilusuario/:id', userController.obtenerUsuarioYPerfil);


module.exports = router;
