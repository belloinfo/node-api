'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById); // '/admin/:id' para resolver o conflito de rotas do get
router.get('/tags/:tag', controller.getByTag); // '/tags/:tag' para resolver o conflito de rotas do get
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;