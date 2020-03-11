const express = require('express');
const router = new express.Router();
const {Product, Category, Review} = require('../models');
const Sequelize = require("sequelize")
const Promise = require("bluebird");
module.exports = router;

// Middleware que automatiza la busqueda
router.param("productId", (req, res, next, id) => {
    Product.findOne({
        where: { id : req.params.productId },
        include: [
            {
                 model : Category 
            }
        ]
    })
        .then(product => {
            if (product) {
                req.product = product
                next()
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.status(500).send(err)
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
    Product.findAll(req.query.s ? {
        where: { name: { [Op.iLike]: `%${req.query.s}%` } }
    } : {})
        .then((productos) => 
            Promise.all(
                productos.map(p => p.rating().then((data) => {
                    p.dataValues.rating = data;
                    return p;
                }))
            )
        )
        .then((productos) => {
            let sorting;

            switch (req.query.o) {
              case "lp":
                sorting = (b,a) => b.price - a.price;
                break;
              case "hp":
                sorting = (a,b) => b.price - a.price;
                break; 
              case "lr":
                sorting = (b,a) => b.dataValues.rating - a.dataValues.rating;
                break;
              case "hr":
                sorting = (a,b) => b.dataValues.rating - a.dataValues.rating;
                break; 
              default:
                sorting = (b, a) => b.id - a.id
            }

            res.status(200).json(pageSeparation(productos.sort(sorting)))
        })
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
        return Promise.all([
            nuevoReview.setProduct(req.product),
            nuevoReview.setUser(req.user) 
        ])
        .then(()=> nuevoReview)
    })
    .then((nuevoReview)=>res.status(201).json(nuevoReview))
});

router.get('/:productId/reviews', function (req, res, next) {
    Review.findAll({where: {
        productId: req.params.productId,
    },
    include: [{
        model: User
    }]
    })
    .then(reviews => {
        const maped = reviews.map(r => {
            r.dataValues.user = r.user.username
            return r
        })
        res.status(200).json(maped)
    })
});

router.get('/:id', (req, res) => { 
    const Op = Sequelize.Op
    if(req.query.s){   
        Product.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Category,
                where: {name:{[Op.iLike]: `%${req.query.s}%`}}
            }]
        })
        .then((product) => {
            product ? res.send(pageSeparation(product.categories)) : res.send([[]])
        })
    }
})
