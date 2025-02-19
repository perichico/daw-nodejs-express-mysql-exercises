const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('users', 'lubuntu', 'Lubuntu1!', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

// Usuario
const Usuario = sequelize.define('Usuario', {
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
      msg: "Este correo electrónico ya está en uso.",   //En vez de msg puede ser simplemente true.
    },
    validate: {
      isEmail: { msg: "El correo electrónico debe tener un formato válido." },
    },
  },
  Contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, Infinity],
        msg: "La contraseña debe tener al menos 8 caracteres.",
      },
    },
  },
});

// Perfil
const Perfil = sequelize.define('Perfil', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Usuario, // Referencia a la tabla Usuario
      key: 'ID',
    },
  },
  Direccion: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  Telefono: {
    type: DataTypes.STRING(15),
    allowNull: true,
    validate: {
      // Validación para teléfono (debe ser un número de teléfono válido)
      is: /^[0-9]{10}$/, // Expresion regular 10 digitos
    },
  },
  FechaNacimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  FotoPerfil: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

Usuario.hasOne(Perfil, { foreignKey: 'UsuarioId' });
Perfil.belongsTo(Usuario, { foreignKey: 'UsuarioId' });

sequelize.sync({ force: true }).then(() => {
  console.log("Tablas 'Usuario' y 'Perfil' sincronizadas correctamente.");
}).catch(err => {
  console.error("Error al sincronizar las tablas:", err);
});

// Exportar los modelos
module.exports = { Usuario, Perfil, sequelize };
