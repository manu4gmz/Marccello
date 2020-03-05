const Sequelize = require('sequelize')
const sequelize = require('../config/db');



class ProductPurchase extends Sequelize.Model { }
ProductPurchase.init({
    amount: {
    	type: Sequelize.INTEGER,
    	defaultValue: 1
    }

}, { sequelize, modelName: 'product_purchase' });

module.exports = ProductPurchase