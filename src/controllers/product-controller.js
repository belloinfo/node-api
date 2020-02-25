'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

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
	let contract = new ValidationContract();
	contract.hasMinLen(request.body.title, 3, 'o Titulo de conter pelo menos 3 caracteres');
	contract.hasMinLen(request.body.alug, 3, 'o alug de conter pelo menos 3 caracteres');
	contract.hasMinLen(request.body.description, 3, 'o description de conter pelo menos 3 caracteres');
	contract.hasMinLen(request.body.tags, 3, 'o tags de conter pelo menos 3 caracteres');

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
	Product.findByIdAndUpdate(request.params.id, {
		$set: {
			title: request.body.title,
			description: request.body.description,
			slug: request.body.slug,
			price: request.body.price,
			tags: request.body.tags
		}
	})
		.then(x => {
			response.status(200).send({ message: 'Produto atualizado com sucesso!' });
		}).catch(e => {
			response.status(400).send({ message: 'Falha ao atualizar o produto', data: e });
		});

};

exports.delete = (request, response, next) => {
	Product.findByIdAndDelete(request.body.id)
		.then(x => {
			response.status(200).send({ message: 'Produto deletado com sucesso!' });
		}).catch(e => {
			response.status(400).send({ message: 'Falha ao deletar o produto', data: e });
		});

};