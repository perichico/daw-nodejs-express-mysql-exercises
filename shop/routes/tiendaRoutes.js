const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');

router.get('/', tiendaController.index);

// Rutas de Clientes
router.get('/clientes', tiendaController.obtenerClientes);
router.post('/clientes', tiendaController.crearCliente);
router.get('/clientes/:id', tiendaController.obtenerClientePorId);
router.delete('/clientes/:id', tiendaController.eliminarCliente);

// Rutas de Pedidos
router.get('/pedidos', tiendaController.obtenerPedidos);
router.post('/pedidos', tiendaController.crearPedido);
router.get('/pedidos/:id', tiendaController.obtenerPedidoPorId);
router.put('/pedidos/:id', tiendaController.actualizarPedido);
router.delete('/pedidos/:id', tiendaController.eliminarPedido);

// Consultas avanzadas
router.get('/clientesconpedidos', tiendaController.obtenerClientesConPedidos);
router.get('/pedidosfecha/:fecha', tiendaController.obtenerPedidosPorFecha);
router.get('/totalpedidos/:id', tiendaController.obtenerTotalPedidosPorCliente);

module.exports = router;
    