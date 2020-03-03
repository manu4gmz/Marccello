const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Product extends Sequelize.Model { }

Product.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rating: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imgURL: {
        type: Sequelize.STRING,
        defaultValue: 'http://via.placeholder.com/300'
    },

    visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'product'
    });

module.exports = Product