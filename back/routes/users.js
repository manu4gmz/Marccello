const express = require('express');
const router = express.Router()
const passport = require('passport');
const User = require('../models/user')
const sequelize = require('sequelize')
//routes

//registra usuario
router.post('/register', (req, res) => {
    User.create(req.body)
    .then((user) => res.send(user))    
})

//loguea usuario
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
})

//desloguea usuario
router.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect('/login')
    } else {
        res.redirect('/')
    }
})

//devuelve un usuario logueado si existe
router.get('/checkLogUser', (req, res) => {
    req.isAuthenticated()? res.send(req.user) : res.send('No hay usuario logueado')    
})

//devuelve los usuarios
router.get('/', (req, res) => {
    User.findAll(
        {
            where: {
                id: {
                    [sequelize.Op.not]: req.user.id
                }
            }
        }
    )
    .then((users) => res.send(users.sort((a,b)=>b.id - a.id)))
})

//promueve un usuario
router.get('/promote/:id', (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
        user.update({
            type: 'admin'
        })
        .then((user) => res.send(user))
    }
    )
})

//degradar un usuario
router.get('/demote/:id', (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
        user.update({
            type: 'normal'
        })
        .then((user) => res.send(user))
    }
    )
})

module.exports = router