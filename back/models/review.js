const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Review extends Sequelize.Model { }

Review.init({
    reviewTitle: sequelize.STRING,
    reveiwContent: sequelize.TEXT,
    rating: sequelize.INTEGER

}, {
        sequelize,
        modelName: 'review'
    });








module.exports = Review