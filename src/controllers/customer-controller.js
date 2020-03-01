'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');

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

exports.post = async (request, response, next) => {
	let contract = new ValidationContract();
	contract.hasMinLen(request.body.name, 3, 'o Nome deve conter pelo menos 3 caracteres');
	contract.isEmail(request.body.email, 'o Email esta inválido');
	contract.hasMinLen(request.body.password, 6, 'o slug deve conter pelo menos 6 caracteres');


	//Se os dados forem inválidos
	if (!contract.isValid()) {
		response.status(400).send(contract.errors()).end();
		return;
	}

	try {
		await repository.create({
			name: request.body.name,
			email: request.body.email,
			password: md5(request.body.password + global.SALT_KEY)

		});

		emailService.send(request.body.email, 'Bem vindo ao NodeApi', global.EMAIL_TMPL.replace('{0}', request.body.name));

		response.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
	} catch (e) {
		response.status(500).send({ message: 'Falha ao cadastrar o Cliente', data: e });
	}


};