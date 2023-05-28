const express = require('express')
const app = express()
const passport = require('passport'); //obsługa logowania
const flash = require('express-flash')
const session = require('express-session')
const { initializePassport } = require('./passport')
const router = require('./routes/router')
const routerPages = require('./routes/routerPages')
const routerPassport = require('./routes/routerPassport')
const methodOverride = require('method-override')
const { checkAuthenticated } = require('./middlewares')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

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

app.use('/', routerPassport) //router zawierający zapytania odnośnie logowania i rejestracji
app.use('/', routerPages) //router zawierający strony html z odpowiedziai
app.use('/', checkAuthenticated, router) //router zawierający pozostałe zapytania API

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(8000, () => {
  console.log('Server is listaning on 8000...')
})
