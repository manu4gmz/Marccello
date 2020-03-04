const Sequelize = require('sequelize')
const sequelize = require('../config/db');
const CartProduct = require('./cartProduct')



class Cart extends Sequelize.Model { }
Cart.init({
    executed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    delivered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

}, { sequelize, modelName: 'cart' });


Cart.prototype.purchase = function (userId) {
    this.executed = true;
    Cart.create({ userId: userId })
        .then(data => { return data })
}

Cart.prototype.deliver = function () {
    this.delivered = true;
}

Cart.prototype.total = function () {
    CartProduct.findAll({ where: { cartId: this.id } })
        .then()
}


module.exports = Cart