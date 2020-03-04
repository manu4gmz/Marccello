const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Category extends Sequelize.Model { }
Category.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'purchase' });

module.exports = Category;