const { Cliente, Pedido, Sequelize } = require('../models/tiendaModel');

const index = (req, res) => {
    res.render('index'); 
};

const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.render('clientes/index', { clientes }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearCliente = async (req, res) => {
    try {
        const nuevoCliente = await Cliente.create(req.body);
        res.redirect('/clientes'); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id, {
            include: [{ model: Pedido }]
        });
        if (cliente) {
            res.render('clientes/buscarCliente', { cliente }); 
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            await Pedido.destroy({ where: { ClienteId: req.params.id } });
            await cliente.destroy();
            res.redirect('/clientes'); 
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Gestión de Pedidos

const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [{ model: Cliente, attributes: ['Nombre'] }]
        });
        res.render('pedidos/index', { pedidos }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearPedido = async (req, res) => {
    try {
        const nuevoPedido = await Pedido.create(req.body);
        res.redirect('/pedidos'); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerPedidoPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [{ model: Cliente }]
        });
        if (pedido) {
            res.render('pedidos/buscarPedido', { pedido }); 
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (pedido) {
            await pedido.update(req.body);
            res.redirect(`/pedidos/${req.params.id}`); 
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (pedido) {
            await pedido.destroy();
            res.redirect('/pedidos'); 
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Consultas Avanzadas

const obtenerClientesConPedidos = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            include: [{ model: Pedido }],
            where: { '$Pedidos.id$': { [Sequelize.Op.ne]: null } }
        });
        res.render('clientes/with-pedidos', { clientes }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPedidosPorFecha = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            where: { fecha: req.params.fecha }
        });
        res.render('pedidos/fecha', { pedidos }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerTotalPedidosPorCliente = async (req, res) => {
    try {
        const total = await Pedido.sum('monto', {
            where: { ClienteId: req.params.id }
        });
        res.render('clientes/total-pedidos', { total }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportación de los Controladores
module.exports = {
    index,
    obtenerClientes,
    crearCliente,
    obtenerClientePorId,
    eliminarCliente,
    obtenerPedidos,
    crearPedido,
    obtenerPedidoPorId,
    actualizarPedido,
    eliminarPedido,
    obtenerClientesConPedidos,
    obtenerPedidosPorFecha,
    obtenerTotalPedidosPorCliente
};