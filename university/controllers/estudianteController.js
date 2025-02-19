const Estudiante = require('../models/estudianteModel');

// Ruta para crear un nuevo estudiante
async function crearEstudiante(req, res) {
    const { dni, nombre, apellido, campus, edad, estado } = req.body;

    try {
        const [estudiante, creado] = await Estudiante.findOrCreate({
            where: { dni },
            defaults: {
                nombre,
                apellido,
                campus,
                edad,
                estado
            }
        });

        if (creado) {
            res.status(201).json(estudiante);
        } else {
            res.status(400).json({ message: 'El estudiante ya existe.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el estudiante.' });
    }
}

// Ruta para mostrar un estudiante específico por DNI
async function obtenerEstudiante(req, res) {
    const { dni } = req.params;

    try {
        const estudiante = await Estudiante.findOne({
            where: { dni }
        });

        if (estudiante) {
            res.render('verEstudiante', estudiante);
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos del estudiante.' });
    }
}

// Ruta para listar todos los estudiantes
async function listarEstudiantes(req, res) {
    try {
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de estudiantes.' });
    }
}

// Ruta para borrar un estudiante por DNI
async function borrarEstudiante(req, res) {
    const { dni } = req.params;

    try {
        const estudiante = await Estudiante.findOne({
            where: { dni }
        });

        if (estudiante) {
            await estudiante.destroy();
            res.status(200).json({ message: 'Estudiante eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el estudiante.' });
    }
}

module.exports = {
    crearEstudiante,
    obtenerEstudiante,
    listarEstudiantes,
    borrarEstudiante
};
