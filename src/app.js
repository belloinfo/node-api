'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Conectar ao Banco
mongoose.connect('mongodb+srv://belloinfo:323327@nodeapi-zgtpw.gcp.mongodb.net/test?retryWrites=true&w=majority');

//Carregar as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app; //exportar a app