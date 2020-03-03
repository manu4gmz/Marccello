const express = require('express');
const router = express.Router()
const passport = require('passport');
const User = require('../models/user')
//routes

router.post('/register', (req, res) => {
    User.create(req.body)
    .then((user) => console.log(user))    
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
})

router.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect('/login')
    } else {
        res.redirect('/')
    }
})

router.get('/checkLog', (req, res) => {
    req.isAuthenticated()? res.send(req.user) : res.send('No hay usuario logueado')    
})

router.get('/promote', (req, res) => {
    console.log(req)
    User.update({
        type: ''
    })
    .then((user) => console.log(user))
})

//type: superAdmin, admin, normal