const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("tienda", "usuario", "Abc1234!", {
    host: "127.0.0.1",
    dialect: "mysql",
});

// Definir el modelo Marca
const Marca = sequelize.define("marcas", {
    cif: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true, 
    },
    nombreMarca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nacionalidad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Definir el modelo Producto
const Producto = sequelize.define('producto', {
    nombreProducto: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT, 
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marcaCIF: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'marcas', 
            key: 'cif',
        }
    }
}, {
    timestamps: false,
});

Marca.hasMany(Producto, { foreignKey: 'marcaCIF' });
Producto.belongsTo(Marca, { foreignKey: 'marcaCIF' });

sequelize.sync()
    .then(() => console.log("Base de datos sincronizada"))
    .catch((error) => console.error("Error al sincronizar la base de datos:", error));

module.exports = {Producto,Marca, sequelize, Sequelize};
