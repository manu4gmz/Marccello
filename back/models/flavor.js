const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Flavor extends Sequelize.Model { }

Flavor.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
    visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'flavor'
    });




module.exports = Flavor