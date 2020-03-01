'use strict'

const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async (request, response, next) => {

	try {
		var data = await repository.get();
		response.status(201).send(data);
	} catch (e) {
		response.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.post = async (request, response, next) => {

	try {
		await repository.create({
			customer: request.body.customer,
			number: guid.raw().substring(0, 6),
			items: request.body.items
		});
		response.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
	} catch (e) {
		response.status(500).send({ message: 'Falha ao cadastrar o Cliente', data: e });
	}


};