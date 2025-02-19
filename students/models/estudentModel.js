const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("instituto", "lubuntu", "Lubuntu1!", {
  host: "127.0.0.1",
  dialect: "mysql",
});

// Estudiante
const Estudiante = sequelize.define("Estudiante", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre es obligatorio." },
    },
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: "Este correo electrónico ya está en uso.",
    },
    validate: {
      isEmail: { msg: "El correo electrónico debe tener un formato válido." },
    },
  },
  Edad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 16,
      max: 100,
      msg: "La edad debe estar comprendida entre 16 y 100 años.",
    },
  },
});

// Curso
const Curso = sequelize.define("Curso", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Titulo: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: {
        args: [1, 200],
        msg: "El título debe tener como máximo 200 caracteres.",
      },
    },
  },
});

// EstudianteCurso
const EstudianteCurso = sequelize.define("Estudiante_Curso", {
  IDEstudiante: {
    type: DataTypes.INTEGER,
    references: {
      model: Estudiante,
      key: "ID",
    },
  },
  IDCurso: {
    type: DataTypes.INTEGER,
    references: {
      model: Curso,
      key: "ID",
    },
  },
});

// Relacionar la tabla intermedia con las otras dos
Estudiante.belongsToMany(Curso, {
  through: EstudianteCurso,
  foreignKey: "IDEstudiante",
});

Curso.belongsToMany(Estudiante, {
  through: EstudianteCurso,
  foreignKey: "IDCurso",
});

// Marca
const Marca = sequelize.define("Marca", {
  CIF: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: { msg: "El CIF debe contener solo letras y números." },
      notEmpty: { msg: "El CIF es obligatorio." },
    },
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre es obligatorio." },
    },
  },
  Nacionalidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tablas sincronizadas correctamente.");
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err);
  });

// Exportar los modelos
module.exports = { Estudiante, Curso, EstudianteCurso, Marca, sequelize };
