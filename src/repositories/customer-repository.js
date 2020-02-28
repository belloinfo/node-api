'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


exports.create = async (data) => {
	var customer = new Customer(data);
	customer.name = data.name;
	customer.email = data.email;
	customer.password = data.password;
	await customer.save();

}