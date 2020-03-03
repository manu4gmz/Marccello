const Sequelize = require('sequelize')
const sequelize = require('../config/db');

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
    imgURL: {
        type: Sequelize.STRING,
        defaultValue: 'http://via.placeholder.com/300'
    },

    visible: {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'product'
    });

module.exports = Product