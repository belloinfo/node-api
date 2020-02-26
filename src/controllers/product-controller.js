'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async (request, response, next) => {

	try {
		var data = await repository.get();
		response.status(200).send(data);
	} catch (e) {
		response.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.getBySlug = async (request, response, next) => {

	try {
		var data = await repository.getBySlug(request.params.slug);
		response.status(200).send(data);
	} catch (e) {
		response.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.getByTags = async (request, response, next) => {

	try {
		var data = await repository.getByTags(request.params.tags);
		response.status(200).send(data);
	} catch (e) {
		response.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.getById = async (request, response, next) => {
	repository.getById(request.params.id)
		.then(data => {
			response.status(200).send(data);
		}).catch(e => {
			response.status(400).send(e);
		});
};

exports.post = async (request, response, next) => {
	let contract = new ValidationContract();
	contract.hasMinLen(request.body.title, 3, 'o Titulo deve conter pelo menos 3 caracteres');
	contract.isRequired(request.body.title, 'o Titulo não esta em branco');
	contract.hasMinLen(request.body.slug, 3, 'o slug deve conter pelo menos 3 caracteres');
	contract.hasMinLen(request.body.description, 3, 'o description deve conter pelo menos 3 caracteres');
	contract.hasMinLen(request.body.tags, 3, 'o tags deve conter pelo menos 3 Informações');

	//Se os dados forem inválidos
	if (!contract.isValid()) {
		response.status(400).send(contract.errors()).end();
		return;
	}

	try {
		await repository.create(request.body);
		response.status(201).send({ message: 'Produto cadastrado com sucesso!' });
	} catch (e) {
		response.status(500).send({ message: 'Falha ao cadastrar o produto', data: e });
	}


};

exports.put = async (request, response, next) => {
	
	try {
			await repository.update(request.params.id, request.body);			
			response.status(200).send({ message: 'Produto atualizado com sucesso!' });
		} catch (e) {
			response.status(500).send({ message: 'Falha ao atualizar o produto', data: e });
		}	
};

exports.delete = async (request, response, next) => {
	
	try {
			await repository.delete(request.body.id);
			response.status(201).send({ message: 'Produto deletado com sucesso!' });
		} catch (e) {
			response.status(500).send({ message: 'Falha ao deletar o produto', data: e });
		}
};