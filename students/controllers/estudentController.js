const { Estudiante, Curso, Marca, EstudianteCurso, sequelize } = require('../models/estudentModel');

// Controlador de Estudiantes
const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearEstudiante = async (req, res) => {
    try {
        const nuevoEstudiante = await Estudiante.create(req.body);
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (estudiante) {
            res.json(estudiante);
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const borrarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (estudiante) {
            await estudiante.destroy();
            res.status(200).json({ message: 'Estudiante eliminado' });
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerEstudiantesPorEdad = async (req, res) => {
    try {
        const { age } = req.params;
        const estudiantes = await Estudiante.findAll({
            where: {
                edad: { [sequelize.Op.gt]: age }
            }
        });
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador de Cursos
const obtenerCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearCurso = async (req, res) => {
    try {
        const nuevoCurso = await Curso.create(req.body);
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (curso) {
            res.json(curso);
        } else {
            res.status(404).json({ error: 'Curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const borrarCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (curso) {
            await curso.destroy();
            res.status(200).json({ message: 'Curso eliminado' });
        } else {
            res.status(404).json({ error: 'Curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerCursosPorEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const cursos = await EstudianteCurso.findAll({
            where: { IDEstudiante: id },
            include: [Curso]
        });
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador de Relación Estudiante-Curso
const asignarCursoAEstudiante = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const enrollment = await EstudianteCurso.create({ IDEstudiante: studentId, IDCurso: courseId });
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const desasignarCursoAEstudiante = async (req, res) => {
    try {
        const { studentId, courseId } = req.params;
        const enrollment = await EstudianteCurso.destroy({
            where: {
                IDEstudiante: studentId,
                IDCurso: courseId
            }
        });
        if (enrollment) {
            res.status(200).json({ message: 'Inscripción eliminada' });
        } else {
            res.status(404).json({ error: 'Inscripción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerRankingCursos = async (req, res) => {
    try {
        const ranking = await Curso.findAll({
            attributes: ['titulo', [sequelize.fn('COUNT', sequelize.col('EstudiantesCurso.IDCurso')), 'total_estudiantes']],
            include: [{
                model: EstudianteCurso,
                attributes: [],
            }],
            group: ['Curso.id'],
            order: [[sequelize.fn('COUNT', sequelize.col('EstudiantesCurso.IDCurso')), 'DESC']]
        });
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador de Marcas
const obtenerMarcas = async (req, res) => {
    try {
        const marcas = await Marca.findAll();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearMarca = async (req, res) => {
    try {
        const nuevaMarca = await Marca.create(req.body);
        res.status(201).json(nuevaMarca);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const eliminarMarca = async (req, res) => {
    try {
        const { cif } = req.params;
        const marca = await Marca.findByPk(cif);
        if (marca) {
            const cursos = await Curso.findAll({ where: { cifMarca: cif } });
            if (cursos.length > 0) {
                return res.status(400).json({ error: 'La marca tiene cursos asociados, no se puede eliminar' });
            }
            await Marca.destroy({ where: { cif } });
            res.status(200).json({ message: 'Marca eliminada' });
        } else {
            res.status(404).json({ error: 'Marca no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerEstudiantes,
    crearEstudiante,
    obtenerEstudiante,
    borrarEstudiante,
    obtenerEstudiantesPorEdad,
    obtenerCursos,
    crearCurso,
    obtenerCurso,
    borrarCurso,
    obtenerCursosPorEstudiante,
    asignarCursoAEstudiante,
    desasignarCursoAEstudiante,
    obtenerRankingCursos,
    obtenerMarcas,
    crearMarca,
    eliminarMarca
};
