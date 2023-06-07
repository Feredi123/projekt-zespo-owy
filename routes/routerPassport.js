const express = require('express')
const routerPassport = express.Router()
const passport = require('passport'); //obsługa logowania
const { checkAuthenticated } = require('../middlewares')
const bcrypt = require('bcrypt'); // hashowanie haseł
const pool = require('../config/database')
const path = require('path');

routerPassport.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
}))

routerPassport.delete('/logout', function(req, res, next) { //wylogowywanie
    req.logOut(function(err) {
      if (err) {return next(err); }
    console.log("user is no longer logged in"),
    res.redirect('/login');
    });
});
  
routerPassport.get('/register', checkAuthenticated,(req,res) => {
    res.sendFile(path.join(__dirname,'../html/register.html'))
})

module.exports = routerPassport;