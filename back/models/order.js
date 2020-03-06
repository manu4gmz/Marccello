const Sequelize = require('sequelize')
const sequelize = require('../config/db');



class Order extends Sequelize.Model { }
Order.init({
    amount: {
    	type: Sequelize.INTEGER,
    	defaultValue: 1
    },
    stock: {
    	type: Sequelize.INTEGER
    }

}, { sequelize, modelName: 'order' });

module.exports = Order