const express = require('express');
const router = new express.Router();
const models = require('../models');
const Product = models.Product;
const Review = models.Review;
const CartProduct = require('../models/cartProduct')
module.exports = router;

router.get('/:userId', function (req, res, next) {
    Cart.findOne({ where: { userId: req.params.userId, executed: false } })
        .then(cart => res.send(cart))
        .catch(next)

})



router.put('/:userId', function (req, res, next) {
    Cart.findAll({ where: { userId: req.params.userId, executed: false } })
        .then(carts => carts[0])
        .then(cart.increment(req.body))
        .catch(next)
})





router.put('/increment/:userId', function (req, res, next) {
    Cart.findOne({ where: { userId: req.params.userId, executed: false } })
        .then(cart => cart.id)
        .then(data => CartProduct.findAll({ where: { cartId: data } })
            .catch(next)
        )
})

router.put('/decrement/:userId', function (req, res, next) {
    Cart.findOne({ where: { userId: req.params.userId, executed: false } })
        .then(cart => cart.decrement)
        .then(data => res.send(data))
        .catch(next)
})




