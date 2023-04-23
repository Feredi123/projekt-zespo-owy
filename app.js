if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt'); // hashowanie haseł
const passport = require('passport'); //obsługa logowania
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  login => users.find(user => user.login === login)
  )

const users = []; //tymczasowe przechowywanie urzytkowników do testów

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash : true
}))

const router = require('./routes/router')

app.get('/', (req, res) => {
    res.sendFile(__dirname,'./public/index.html')
})

app.use('/', router)

app.all('*', (req, res) => {
    res.status(404).send('resource not found')
})


app.listen(8000, () => {
  console.log('Server is listaning on 8000...')
})

app.post('/register', async  (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      first_name: req.body.first_name,
      password: hashedPassword
    })
    res.redirect('/index.html')
  } catch {
    res.redirect('/index.html')
    console.log(users)
  }
  console.log(users)
})