const { Marca, Producto } = require('../models/productosModel');
const { sequelize, Sequelize} = require('../models/productosModel');

module.exports = {
    obtenerProductos: async (req, res) => {
        try {
            const productos = await Producto.findAll();
            res.render("producto", { productos }); 
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos", detalle: error.message });
        }
    },

    addProductos: async (req, res) => {
        try {
            const { nombreProducto, precio, categoria, marcaCIF } = req.body;
            const marca = await Marca.findByPk(marcaCIF);

            if (marca) {
                await Producto.create({
                    nombreProducto: nombreProducto,
                    precio,
                    categoria,
                    marcaCIF
                });
                res.redirect("/products");
            } else {
                res.status(400).json({ error: "No existe la marca" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error al añadir un nuevo producto", detalle: error.message });
        }
    },

    deleteProducto: async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await Producto.findByPk(id);
    
            if (producto) {
                await producto.destroy();
                res.json({ mensaje: "Producto eliminado correctamente" });
            } 
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el producto", detalle: error.message });
        }
    },
    
    obtenerProductoID: async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await Producto.findByPk(id);
            if (producto) {
                res.render("mostrarProducto", {producto}); //RENDER TAMBIEN MANDA UN OBJETO
            }
        } catch (error) {
            res.status(500).json({error: "Error al buscar el producto", detalle: error.message});
        }
    },

    crearMarca: async (req, res) => {
        try {
            const {cif, nombreMarca, nacionalidad} = req.body;
            Marca.create({cif, nombreMarca, nacionalidad}); //CREATE DEBE RECIBIR UN OBJETO    
            res.redirect("/marca");
        } catch (error) {
            res.status(500).json({error: "Error al crear la marca", detalle: error.message});
        }
    },

    obtenerMarcas: async (req, res) => {
        try {
            const marcas = await Marca.findAll();
            res.render("marcas", { marcas }); 
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las marcas", detalle: error.message });
        }
    },

    borrarMarca: async (req, res) => {
        try {
            const cif = req.params.cif;
            const marca = await Marca.findByPk(cif);
    
            if (marca) {
                await marca.destroy();
                res.json({ mensaje: "Marca eliminada correctamente" });
            } 
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la marca", detalle: error.message });
        }
    },

    obtenerProductosMarca: async (req, res) => {
        try {
            const cif = req.params.cif;
            const productos = await Producto.findAll({
                where: { marcaCIF: cif }  
            });
            const marca = await Marca.findByPk(cif);
            res.render("mostrarMarcaProductos", { productos, marca });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos de una marca", detalle: error.message });
        }
    },  
    
    obtenerRankingMarcas: async (req, res) => {
        try {
            // Consulta SQL para obtener el ranking de marcas con más productos
            const rankingMarcas = await sequelize.query(`
                SELECT marcas.cif, marcas.nombreMarca, COUNT(productos.id) AS productoCount
                FROM marcas
                LEFT JOIN productos ON marcas.cif = productos.marcaCIF
                GROUP BY marcas.cif
                ORDER BY productoCount DESC;
            `, {
                type: Sequelize.QueryTypes.SELECT
            });
    
            // Renderiza la vista con el ranking de marcas
            res.render('rankingMarcas', { rankingMarcas });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el ranking de marcas', detalle: error.message });
        }
    },
}
