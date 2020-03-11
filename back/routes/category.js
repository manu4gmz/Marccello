const express = require('express');
const router = express.Router()
const passport = require('passport');
const {Product, Category} = require('../models')
const Sequelize = require('sequelize')
const Promise = require("bluebird")
//routes

//crea una categoria
router.post('/:id', (req, res) => {
    Product.findByPk(req.params.id)
    .then((producto) => {
        Category.findOrCreate({
            where: {name: req.body.name}
        })
        .then(([category]) => {
            producto.addCategory(category)
            res.send(category)
        })
    })
})

//busca una categoria
router.get('/', (req, res) => {    
    Category.findAll()
    .then((category) => {
        res.send(category)
    })    
})

function pageSeparation (productos) {
    const pages = [];
    for (let i = 0, x = 0; i < productos.length; i += 8, x++) {
        //console.log(x, i)
        pages[x] = productos.slice(i, i+8);
    }
    return pages;
}
//busca producto por categoria
router.get('/:id', (req, res) => { 
    const Op = Sequelize.Op
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [
        req.query.s ? 
        {
            model: Product,
            where: {name:{[Op.iLike]: `%${req.query.s}%`}}
        } : { model: Product } ]
    })
    .then((category) => 
        category ?
        Promise.all(
            category.products.map(p => p.rating().then((data) => {
                p.dataValues.rating = data;
                return p;
            }))
        ) : []
    )
    .then((products) => {
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


        res.send(pageSeparation(products.sort(sorting))) 
    })

})

//elimina una categoria
router.delete('/:id', (req, res) => {
    Category.destroy({where: {
        id: req.params.id
    }})
    .then(() => res.send(`categoria eliminada`))    
})

module.exports = router