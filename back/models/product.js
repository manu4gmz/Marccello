const Sequelize = require('sequelize')
const sequelize = require('../config/db');
const User = require('./user')


class Product extends Sequelize.Model { }

Product.init({
    productName: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rating: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    stock: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    visible: {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'products'
    });




module.exports = Product