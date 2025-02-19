const { Usuario, Perfil, sequelize } = require('../models/userModel');

const obtenerUsuarios = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.render('usuarios/usuarios', { users }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.redirect('/usuarios'); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerUsuario = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id, {
            include: [{ model: Perfil }]
        });
        if (user) {
            res.render('usuario/buscarUsuario', { user }); //Corregir luego
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const borrarUsuario = async (req, res) => {
    try {
        const usuario = await usuario.findByPk(req.params.id);
        if (usuario) {
            //await Usuario.destroy({ where: { UsuarioId: req.params.id } });
            await usuario.destroy();
            res.redirect('/usuarios'); 
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPerfiles = async (req, res) => {
    try {
        const perfiles = await Perfil.findAll();
        res.render('perfiles/perfiles', { perfiles }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearPerfil = async (req, res) => {
    try {
        const nuevoPerfil = await Perfil.create(req.body);
        res.redirect('/perfiles'); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerPerfil = async (req, res) => {
    try {
        const perfil = await Usuario.findByPk(req.params.id, {
            include: [{ model: Usuario }]
        });
        if (perfil) {
            res.render('perfil/buscarPerfil', { perfil }); //Corregir luego
        } else {
            res.status(404).json({ error: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarPerfil = async (req, res) => {
    try {
        const perfil = await Perfil.findByPk(req.params.id);
        if (perfil) {
            await perfil.update(req.body);
            res.redirect(`/perfil/${req.params.id}`); 
        } else {
            res.status(404).json({ error: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const borrarPerfil = async (req, res) => {
    try {
        const perfil = await Perfil.findByPk(req.params.id);
        if (perfil) {
            await perfil.destroy();
            res.redirect('/perfil'); 
        } else {
            res.status(404).json({ error: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerUsuariosConPerfil = async (req, res) => {
    try {
        const users = await Usuario.findAll({
            include: [{ model: Perfil }],
            where: { '$Perfil.id$': { [sequelize.Op.ne]: null } }
        });
        res.render('usuario/conperfil', { users }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerUsuariosSinPerfil = async (req, res) => {
    try {
        const users = await Usuario.findAll({
            include: [{ model: Perfil }],
            where: { '$Perfil.id$': { [sequelize.Op.is]: null } }
        });
        res.render('usuario/sinperfil', { users }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const obtenerUsuarioYPerfil = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id, {
            include: [{ model: Perfil }] 
        });
        
        if (user) {
            res.render('usuario/perfilUsuario', { user }); 
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportación de los Controladores
module.exports = {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuario,
    borrarUsuario,
    obtenerPerfiles,
    crearPerfil,
    obtenerPerfil,
    actualizarPerfil,
    borrarPerfil,
    obtenerUsuariosConPerfil,
    obtenerUsuariosSinPerfil,
    obtenerUsuarioYPerfil
};