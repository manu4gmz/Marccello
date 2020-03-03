const Sequelize = require('sequelize')
const sequelize = require('../config/db');



class Cart extends Sequelize.Model { }
Cart.init({
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false

    }

}, { sequelize, modelName: 'purchase' });

module.exports = Cart