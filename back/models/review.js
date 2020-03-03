const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Review extends Sequelize.Model { }

Review.init({
    tTitle: Sequelize.STRING,
    content: Sequelize.TEXT,
    rating: Sequelize.INTEGER

}, {
        sequelize,
        modelName: 'review'
    });








module.exports = Review