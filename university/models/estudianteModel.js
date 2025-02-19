const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('instituto', 'lubuntu', 'Lubuntu1!', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((error) => console.log('Error al sincronicar la base de datos'));

const Estudiante = sequelize.define('Estudiante', {
    dni: {
        type: DataTypes.STRING(13),
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    campus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 18
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente',
        validate: {
            isIn: [['activo', 'inactivo', 'pendiente']]
        }
    }
}, {
    tableName: 'estudiantes', // El nombre de la tabla en la base de datos
    timestamps: false,   // Si no deseas campos de "createdAt" y "updatedAt"
});

module.exports = Estudiante;
