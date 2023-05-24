const express = require('express')
const app = express()
const bcrypt = require('bcrypt'); // hashowanie haseł
const passport = require('passport'); //obsługa logowania
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./passport-config')
const router = require('./routes/router')
const path = require('path');
const methodOverride = require('method-override')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const pool = require('./config/database')
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  /*maxAge: new Date(Date.now() + /*900000 60000),*/
  cookie: {path: '/', secure: false, maxAge: (15*60*1000)},
}))

app.use(passport.session())
app.use(methodOverride('_method'))

app.post('/register', async  (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
      first_name = req.body.first_name;
      last_name = req.body.last_name;
      email = req.body.email;
      phone = req.body.phone;
      password = hashedPassword;
      manager_id = req.body.manager_id;

    pool.query(`INSERT INTO employees (employee_id, first_name, second_name, email, phone, password, photo, admin_rights, manager_id) VALUES (NULL, '${first_name}', '${last_name}', '${email}', '${phone}', '${password}', NULL, '0', '${manager_id}')`);
    res.redirect('/register.html')
  } catch {
    res.redirect('/register.html')
  }
})
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login.html',
  successRedirect: '/index.html'
}))

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    console.log("user is logged in")
    return next()
  }
  console.log("not logged in")
  res.redirect('/login')
}

app.delete('/logout', function(req, res, next) {
  req.logOut(function(err) {
    if (err) {return next(err); }
  console.log("user is no longer logged in"),
  res.redirect('/login');
  });
});

app.get('/recovery', (req, res) => {
  res.redirect('/recovery.html')
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/login.html'))
})


app.use('/', checkAuthenticated, router)
app.get('/', checkAuthenticated, (req, res) => {
  res.redirect('/index.html')
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(8000, () => {
  console.log('Server is listaning on 8000...')
})
