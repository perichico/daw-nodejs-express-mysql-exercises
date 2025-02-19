const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('libros', 'lubuntu', 'Lubuntu1!', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((error) => console.log('Error al sincronicar la base de datos'));

// Exportar la conexión para usarla en otros archivos
module.exports = sequelize;
