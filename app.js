const express = require('express')
const app = express()

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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