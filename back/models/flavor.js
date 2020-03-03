const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Flavor extends Sequelize.Model { }

Flavor.init({
    flavorName: {
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
        modelName: 'flavors'
    });


module.exports = Flavor