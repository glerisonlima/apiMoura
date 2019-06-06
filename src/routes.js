const express = require('express')
const routes = express.Router()

const ProductController = require('./controllers/ProductController')
const PessoaController = require('./controllers/PessoaController')

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.get('/pessoas', PessoaController.list);
routes.put('/products/:id', ProductController.update);
routes.post('/products', ProductController.Store);
routes.delete('/products/:id', ProductController.destroy);


module.exports = routes;