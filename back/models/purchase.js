const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Purchase extends Sequelize.Model { }
Purchase.init({
    total: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    address: {
    	type: Sequelize.STRING,
    	allowNull: false
    },
    coords: {
        type: Sequelize.STRING
    },

    status: {
    	type: Sequelize.ENUM("preparing", "ongoing", "resolved", "lost"),
    	defaultValue: "preparing",
    }

}, { sequelize, modelName: 'purchase' });

module.exports = Purchase


