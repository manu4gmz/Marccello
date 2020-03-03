const Sequelize = require('sequelize')
const sequelize = require('../config/db');

class Review extends Sequelize.Model { }

Review.init({
    title: {type:Sequelize.STRING},
    content: {type:Sequelize.TEXT},
    rating: {type:Sequelize.INTEGER}

}, {
        sequelize,
        modelName: 'review'
    });








module.exports = Review