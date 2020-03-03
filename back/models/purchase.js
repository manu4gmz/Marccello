const Sequelize = require('sequelize')
const sequelize = require('../config/db');
const User = require('./user')


class Purchase extends Model { }
Purchase.init({
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false

    }

}, { sequelize, modelName: 'purchases' });

User.belongsTo({ as: {} })

