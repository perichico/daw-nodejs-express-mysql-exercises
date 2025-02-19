const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/products', productosController.obtenerProductos);
router.post('/products', productosController.addProductos);
router.delete('/products/:id', productosController.deleteProducto);
router.get("/product/:id", productosController.obtenerProductoID);
router.get("/productsMarca/:marca", productosController.obtenerProductosMarca);
router.post('/marca', productosController.crearMarca);
router.get('/marca', productosController.obtenerMarcas);
router.delete('/marca/:cif', productosController.borrarMarca);

router.get('/ranking-marcas', productosController.obtenerRankingMarcas);
module.exports = router;