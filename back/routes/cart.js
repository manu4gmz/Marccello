const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  User,
  Product,
  Purchase,
  ProductPurchase,
  Order
} = require("../models");

/*
router.use("/", function(req, res, next) {
  User.findByPk(1).then(data => {
    req.user = data;
    next();
  });
});*/

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) next();
  else res.status(401).send({msg: "Anda a loguearte"})
}

router.use("/", isLoggedIn);

router.post("/:id", function(req, res) {
  Product.findByPk(req.params.id)
  .then(({stock})=> 
    Order.create({ productId: req.params.id, userId: req.user.id, stock }).then(data => {
      res.status(201).send({ msg: "Añadido correctamente" });
    })
  )
});

router.get("/", function(req, res) {
  req.user.getCart().then(data => {
    res.send(data.products.sort((a,b) => (new Date(a)) - (new Date(b))));
  });
});

//id de la orden

router.put("/:id", function(req, res) {
  Order.findOne({
    where: { userId: req.user.id, productId: req.params.id }
  }).then(orden => {
    orden.amount = Number(orden.amount) + Number(req.body.amount);
    if (orden.amount < 1) orden.amount = 1;

    let exceded = false;
    if (orden.amount > orden.stock) {
      orden.amount = orden.stock;
      console.log("MAX STOCK")
      exceded = true;
    }
    orden.save()
    .then(()=> 
      res.send({ msg: "Modificado perfectamente", result: orden.amount, exceded })
    )
  });
});

router.delete("/:id", function(req, res) {
  Order.findOne({
    where: { userId: req.user.id, productId: req.params.id }
  }).then(data => {
    data.destroy().then(() => {
      res.send({ msg: "Eliminado correctamente" });
    });
  });
});

module.exports = router;
