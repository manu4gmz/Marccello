const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Purchase extends Sequelize.Model { }
Purchase.init({
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    status: {
    	type: Sequelize.ENUM("preparing", "ongoing", "completed", "lost"),
    	defaultValue: "preparing",
    }

}, { sequelize, modelName: 'buy' });

module.exports = Purchase


