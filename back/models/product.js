const Sequelize = require('sequelize')
const sequelize = require('../config/db');
const Review = require('./review')

class Product extends Sequelize.Model { }

Product.init({
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
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false

    }
}, {
        sequelize,
        modelName: 'product'
    });


Product.prototype.rating = function () {
    return Review.findAll({ where: { productId: this.id } })
        .then(data => {
            let acc = 0;
            for (let i = 0; i < data.length; i++) {
                acc += data[i].rating
            }
            return (acc / data.length).toFixed(2)
        })

}


module.exports = Product