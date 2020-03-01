'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.get = async (data) => {
	var result = await Order
		.find({}, 'number status createDate customer items')
		.populate('customer', 'name email')
		.populate('items.product', 'price description title');
	return result;

}
exports.create = async (data) => {
	var order = new Order(data);
	await order.save();

}