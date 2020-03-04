const Sequelize = require('sequelize')
const sequelize = require('../config/db');
const Product = require('./product')
const Cart = require('./cart')



class CartProduct extends Sequelize.Model { }
CartProduct.init({
    amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

}, { sequelize, modelName: 'cart_product' });



CartProduct.prototype.increment = () => {
    this.amount++;
    return Product.findByPk(this.productId)
        .then((product) => {
            this.totalPrice = product.price * this.amount;
            this.save();
            return this;
        })
}


CartProduct.prototype.decrement = () => {
    this.amount--;
    return Product.findByPk(this.productId)
        .then((product) => {
            this.totalPrice = product.price * this.amount;
            this.save();
        })
}





module.exports = CartProduct;