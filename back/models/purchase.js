const Sequelize = require('sequelize')
const sequelize = require('../config/db');



class Purchase extends Model { }
Purchase.init({
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false

    }

}, { sequelize, modelName: 'purchase' });

module.exports = Purchase


