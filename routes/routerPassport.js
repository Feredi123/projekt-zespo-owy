const express = require('express')
const routerPassport = express.Router()
const passport = require('passport'); //obsługa logowania
const { checkAuthenticated } = require('../middlewares')
const bcrypt = require('bcrypt'); // hashowanie haseł
const pool = require('../config/database')
const path = require('path');
const transporter = require('../config/email')
const crypto = require("crypto");

routerPassport.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/my-account'
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

routerPassport.post('/pass-Change', checkAuthenticated, async (req,res) =>{

    id = req.user.employee_id
    hashedPassword = await bcrypt.hash(req.body.password, 10)

    pool.query('UPDATE employees SET password = ?, change_password = ? WHERE employee_id = ?',[hashedPassword, 0, id]);
    res.status(201).json();

})

routerPassport.post('/recover', async (req,res) => {

    var passwordGen = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(passwordGen, 10)
    
      email = req.body.email;
      password = hashedPassword;
    await pool.query('UPDATE employees SET password = ? WHERE email = ?', [password, email]);
    await pool.query('UPDATE employees SET change_password = 1 WHERE email = ?', [email]);
    var mailOptions = {
        from: 'admintest753421@o2.pl',
        to: email,
        subject: 'Password reset',
        text: passwordGen,
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect('/login')
})

module.exports = routerPassport;