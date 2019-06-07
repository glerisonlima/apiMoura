const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mssql = require('mssql')
const requireDir = require('require-dir')


//iniciando o app
const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//iniciando o BD
mssql.connect('Server=localhost;Database=sismoura;User Id=sa;Password=epilef;', {useNewUrlParser: true})
.then(conn => console.log("conectou!"))
.catch(err => console.log("erro! " + err));
requireDir('./src/models')

//const Product = mongoose.model('Product')

//primeira rota
app.use('/api', require('./src/routes'));

app.listen(3000)