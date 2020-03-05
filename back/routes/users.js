const express = require('express');
const router = express.Router()
const passport = require('passport');
const User = require('../models/user')
//routes

//registra usuario
router.post('/register', (req, res) => {
    console.log(req.body);
    
    User.create(req.body)
    .then((user) => res.send(user))    
})

//loguea usuario
router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('entro a /login')
    console.log(req.user)
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

//promueve un usuario a "admin"
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

module.exports = router