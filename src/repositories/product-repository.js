'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
	const result = await Product.find({ active: true }, "title slug price");
	return result;
}

exports.getBySlug = async (slug) => {
	const result = await Product.findOne({ slug: slug, active: true }, "title description price slug tags");
	return result;
}

exports.getByTags = async (tags) => {
	const result = await Product.find({ tags: tags, active: true }, "title description price slug tags");
	return result;
}

exports.getById = async (id) => {
	const result = await Product.findById(id);
	return result;
}

exports.create = async (data) => {
	var product = new Product(data);
	product.title = data.title;
	product.slug = data.slug;
	product.description = data.description;
	product.price = data.price;
	product.active = data.active;
	product.tags = data.tags;
	await product.save();

}

exports.update = async (id, data) => {
	await Product.findByIdAndUpdate(id, {
		$set: {
			title: data.title,
			description: data.description,
			slug: data.slug,
			price: data.price,
			tags: data.tags
		}
	});

}

exports.delete = async (id) => {

	await Product.findByIdAndDelete(id);

}