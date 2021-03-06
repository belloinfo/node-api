'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const app = express();

//Conectar ao Banco
mongoose.connect(config.connectionString);

//Carrega os Models
const Product = require('./models/product-model');
const Customer = require('./models/customer-model');
const Order = require('./models/order-model');

//Carregar as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app; //exportar a app