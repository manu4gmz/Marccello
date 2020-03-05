const { db } = require ('./models')
const express = require ('express');
const app = express()
const routes = require ('./routes/index')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require("./models/user")
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

app.use(session({ 
    secret: "bootcamp",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize()); // passport init
app.use(passport.session()); // https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045



passport.use(new LocalStrategy({ usernameField: 'username' },
  function(inputUsername, password, done) {
    
    User.findOne({ where: {username: inputUsername} })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user); //ESTA TODO OK!
      })
      .catch(done);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id)
        .then(user => done(null, user))
});


app.use('/api', routes)

app.get('/*', (req,res)=> {
    res.sendFile(__dirname + '/public/' + 'index.html')
})

const port = 3000
db.sync({force: false})
.then(() => app.listen(port, function () {
    console.log(`Server is listening on port ${port}!`);
}))
