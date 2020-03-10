const express = require('express');
const router = new express.Router();
const models = require('../models');
const Product = models.Product;
const Review = models.Review;
const Sequelize = require("sequelize")
module.exports = router;

// Middleware que automatiza la busqueda
router.param("productId", (req, res, next, id) => {
    Product.findByPk(id)
        .then(product => {
            if (product) {
                req.product = product
                next()
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.sendStatus(500)
        })
});

function pageSeparation(productos) {
    const pages = [];
    for (let i = 0, x = 0; i < productos.length; i += 8, x++) {
        //console.log(x, i)
        pages[x] = productos.slice(i, i + 8);
    }
    return pages;
}

// te devuelve todos los productos o, si hay una busqueda, te devuelve los que coinciden con la búsqueda
router.get('/', function (req, res, next) {
    const Op = Sequelize.Op
    if (req.query.s) {
        Product.findAll({
            where: { name: { [Op.iLike]: `%${req.query.s}%` } }
        })
            .then(productos => {
                //console.log(pageSeparation(productos))
                res.status(200).json(pageSeparation(productos.sort((b, a) => b.id - a.id)))
            })
    } else {
        Product.findAll()
            .then((productos) => {



                res.status(200).json(pageSeparation(productos.sort((b, a) => b.id - a.id)))
            })
    }
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
router.put("/:productId", (req, res, next) => {
    console.log('Llegue a la ruta esta')
    console.log("OLD \n\n\n", req.product)
    req.product.update(req.body)
        .then(productoU => {
            console.log("NEW \n\n\n", productoU)

            res.status(200).json(productoU)
        })
        .catch(next)
});

// te borra un producto
router.delete("/:productId", (req, res, next) => {
    req.product.destroy()
        .then(() => res.sendStatus(204))
});

// crear un review para un producto
router.post("/:productId", function (req, res, next) {
    Review.create(req.body)
        .then(nuevoReview => {
            nuevoReview.setProduct(req.product)
            res.status(201).json(nuevoReview)
        }
        )
});
