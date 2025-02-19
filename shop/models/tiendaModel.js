const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('tienda', 'lubuntu', 'Lubuntu1!', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((error) => console.log('Error al sincronizar la base de datos'));

const Cliente = sequelize.define('Cliente', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'clientes',
    timestamps: false
});

const Pedido = sequelize.define('Pedido', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Monto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    Estado: {
        type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
        allowNull: false
    },
    ClienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'ID'
        }
    }
}, {
    tableName: 'pedidos',
    timestamps: false
});

Cliente.hasMany(Pedido, { foreignKey: 'ClienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'ClienteId' });

module.exports = { Cliente, Pedido };
