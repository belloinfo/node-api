'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (request, response, next) => {
	Product.find({ active: true }, "title slug price")
		.then(data => {
			response.status(200).send(data);
		}).catch(e => {
			response.status(400).send(e);
		});
};

exports.getBySlug = (request, response, next) => {
	Product.findOne({ slug: request.params.slug, active: true }, "title description price slug tags")
		.then(data => {
			response.status(200).send(data);
		}).catch(e => {
			response.status(400).send(e);
		});
};

exports.getByTag = (request, response, next) => {
	Product.find({ tags: request.params.tag, active: true }, "title description price slug tags")
		.then(data => {
			response.status(200).send(data);
		}).catch(e => {
			response.status(400).send(e);
		});
};

exports.getById = (request, response, next) => {
	Product.findById(request.params.id)
		.then(data => {
			response.status(200).send(data);
		}).catch(e => {
			response.status(400).send(e);
		});
};



exports.post = (request, response, next) => {
	var product = new Product();
	product.title = request.body.title;
	product.slug = request.body.slug;
	product.description = request.body.description;
	product.price = request.body.price;
	product.active = request.body.active;
	product.tags = request.body.tags;
	product.save()
		.then(x => {
			response.status(201).send({ message: 'Produto cadastrado com sucesso!' });
		}).catch(e => {
			response.status(400).send({ message: 'Falha ao cadastrar o produto', data: e });
		});


};

exports.put = (request, response, next) => {
	const id = request.params.id;
	response.status(200).send({ id: id, item: request.body });
};

exports.delete = (request, response, next) => {
	response.status(200).send(request.body);
};