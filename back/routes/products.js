const express = require('express');
const router = new express.Router();
const models = require('../models');
const Product = models.Product;
const Review = models.Review;
module.exports = router;

// Middleware que automatiza la busqueda
router.param("productId", (req, res, next, id) => {
    Product.findByPk(id)
    .then(product => {
        if(product){
            req.product = product
            next()
        } else {
            res.sendStatus(404)
        }
    })
    .catch(err =>{
        res.sendStatus(500)
    })
});

// te devuelve todos los productos o, si hay una busqueda, te devuelve los que coinciden con la búsqueda
router.get('/', function (req, res, next) {
    Product.findAll()
    .then((productos) => {console.log(productos),res.status(200).json(productos)})
});

// te busca un producto
router.get('/:productId', function (req, res, next) {
    res.status(200).json(req.product)
});

// crea un nuevo producto
router.post('/', function (req, res, next) {
    Product.create(req.body)
    .then(nuevoProducto => res.status(201).json(nuevoProducto))
});

// te actualiza un producto
router.put("/:productId", (req, res, next) =>{
    req.product.update(req.body)
    .then(productoU =>res.status(200).json(productoU))
});

// te borra un producto
router.delete("/:productId", (req,res,next) =>{
    req.product.destroy()
    .then(() => res.sendStatus(204))
});

// crear un review para un producto
router.post("/:productId", function (req, res, next) {
    Review.create(req.body)
    .then(nuevoReview => {
        nuevoReview.setProduct(req.product) 
        res.status(201).json(nuevoReview)}
    )
});

// busca un articulo que cuyo nombre coincida con la busqueda
router.post("/buscar", function (req, res, next) {
    Product.findAll({where: {
        name:req.body.name
    }
    })
    .then(productos => res.status(200).json(productos))
})
