const express = require('express');
const router = express.Router()
const passport = require('passport');
const User = require('../models/user')
const sequelize = require('sequelize')
//routes

const email = (email, content) => {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'heladrones@gmail.com',
        pass: 'Marccello1-'
      },
    });    
    const mailOptions = {
      from: 'heladrones@gmail.com',
      to: `${email}`,
      subject: 'Creaste un nuevo usuario',
      text: `Felicidades ${content}! Ya tenés una cuenta de Marccello`
    };    
    console.log("sending email", mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
      console.log("senMail returned!");
      if (error) {
        console.log("ERROR!!!!!!", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

//registra usuario
router.post('/register', (req, res) => {
    User.create(req.body)
    .then((user) => res.send(user))
    .then(()=> email(req.body.email, req.body.username))    
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
    req.isAuthenticated() ? 
        res.send({ user: req.user, logged: true }) 
        :
        res.send({ user: null, logged: false }) 
})

function isSuperAdmin(req, res, next) {
	if (req.isAuthenticated() && (req.user.type == "superAdmin")) next();
	else res.status(401).send({ msg: "Flasheaste man, solo capos" })
}

//devuelve los usuarios
router.get('/', isSuperAdmin, (req, res) => {
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
router.get('/promote/:id', isSuperAdmin, (req, res) => {
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
router.get('/demote/:id', isSuperAdmin, (req, res) => {
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