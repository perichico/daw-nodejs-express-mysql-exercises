const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Libro = sequelize.define('Libro', {
  // Definir las columnas
  isbn: {
    type: DataTypes.STRING(13),
    primaryKey: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'libros', // El nombre de la tabla en la base de datos
  timestamps: false,   // Si no deseas campos de "createdAt" y "updatedAt"
});

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
sequelize.sync()
  .then(() => {
    console.log('Tabla "libros" sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la tabla:', err);
  });

module.exports = Libro;
