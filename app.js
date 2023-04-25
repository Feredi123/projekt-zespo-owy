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
  name => users.find(user => user.name === name),
  id => users.find(user => user.id === id)
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


const router = require('./routes/router')

app.get('/', (req, res) => {
    res.sendFile(__dirname,'./public/index.html')
})

app.use('/', router)

/* app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})
BO KOMU POTRZEBNA OBSŁUGA BŁĘDÓW*/

app.get('/login', (req, res) => {
  res.sendFile(__dirname,'./public/login.html')
})

app.post('/login', passport.authenticate('local', {
  failureRedirect: 'loginfail.html',
  successRedirect: 'index.html'
}))

app.post('/register', async  (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      password: hashedPassword
    })
    res.redirect('/register.html')
  } catch {
    res.redirect('/loginfail.html')
  }
  console.log(users)
})

app.listen(8000, () => {
  console.log('Server is listaning on 8000...')
})
