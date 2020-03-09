const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
//const passport = require("passport");

const {
  User,
  Product,
  Purchase,
  ProductPurchase,
  Order
} = require("../models");

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) next();
  else res.status(401).send({msg: "Anda a loguearte"})
}

router.use("/", isLoggedIn);


router.get("/:id", (req,res)=>{
  Purchase.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(purchase => {
    res.send(purchase);
  })
})

const { statusDrone} = require("../drone");

router.get("/:id/status", (req, res)=>{
  res.send(statusDrone(req.params.id))
})

router.post("/", (req,res) => {
  req.user.getCart()
  .then(({products}) => {

    const total = products
      .map(p => p.price * p.order.amount)
      .reduce((acc, c) => acc + c) + 200

    Purchase.create({
      userId: req.user.id,
      total,
      address: req.body.address
    })
    .then(purchase => {
      Promise.all(
        products.map(({order}) => 
          ProductPurchase.create({
            productId: order.productId,
            amount: order.amount,
            buyId: purchase.id
          })
        )
      )
      .then(orders => {
        if (orders.length !== products.length) {
          return req.status(500).send({msg: "Hubo error groso"})
        }
        return Order.destroy({
          where: {
            userId: req.user.id
          }
        })
        .then(()=> orders);

      })
      .then(orders => res.send(orders))


    })
    
    //res.send(orders)
    
  })
})

router.get("/", isLoggedIn, (req,res) => {
  Purchase.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(purchases => {
    res.send(purchases);
  })

})

module.exports = router;
