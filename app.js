const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_name'
})

connection.connect((err)=>{
    if(err){
        throw err
    }
    console.log('Connected to DB')
})

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname,'./public/index.html')
})

app.get('/people', (req, res) => {

    connection.query("SELECT * FROM employees", (err, results) =>{
        if(err) throw err;
        res.status(200).send(results)
    })
})


app.all('*', (req, res) => {
    res.status(404).send('resource not found')
})

app.listen(8000, () => {
  console.log('Server is listaning on 8000...')
})