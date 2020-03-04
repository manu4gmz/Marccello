const Sequelize = require('sequelize')
const sequelize = require('../config/db');
const User = require('./user')
const Product = require('./product')

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