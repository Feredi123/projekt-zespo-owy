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

routerPassport.post('/register', async  (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      
        first_name = req.body.first_name;
        last_name = req.body.last_name;
        email = req.body.email;
        phone = req.body.phone;
        password = hashedPassword;
        manager_id = req.body.manager_id;
  
      pool.query(`INSERT INTO employees (employee_id, first_name, second_name, email, phone, password, photo, admin_rights, manager_id) VALUES (NULL, '${first_name}', '${last_name}', '${email}', '${phone}', '${password}', NULL, '0', '${manager_id}')`);
      res.redirect('/register')
    } catch {
      res.redirect('/register')
    }
})
  
routerPassport.get('/register', checkAuthenticated,(req,res) => {
    res.sendFile(path.join(__dirname,'../html/register.html'))
})

module.exports = routerPassport;