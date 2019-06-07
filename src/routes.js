const express = require('express')
const routes = express.Router()

//const ProductController = require('./controllers/ProductController')
const PessoaController = require('./controllers/PessoaController')
const AnimalController = require('./controllers/AnimalController')

//routes.get('/products', ProductController.index);
//routes.get('/products/:id', ProductController.show);
routes.get('/pessoas', PessoaController.list);
routes.post('/pessoa', PessoaController.insert);
routes.post('/animal', AnimalController.insert);
//routes.put('/products/:id', ProductController.update);
//routes.post('/products', ProductController.Store);
//routes.delete('/products/:id', ProductController.destroy);


module.exports = routes;