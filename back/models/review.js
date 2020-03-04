const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Review extends Sequelize.Model { }

Review.init({

    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

}, {
        sequelize,
        modelName: 'review'
    });








module.exports = Review