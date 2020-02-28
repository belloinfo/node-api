'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

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
		await repository.create(request.body);
		response.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
	} catch (e) {
		response.status(500).send({ message: 'Falha ao cadastrar o Cliente', data: e });
	}


};