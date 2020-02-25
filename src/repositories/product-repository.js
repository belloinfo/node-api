'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
	return Product.find({ active: true }, "title slug price");
}

exports.getBySlug = (slug) => {
	return Product.findOne({ slug: slug, active: true }, "title description price slug tags");
}

exports.getByTags = (tags) => {
	return Product.find({ tags: tags, active: true }, "title description price slug tags");
}

exports.getById = (id) => {
	return Product.findById(id);
}

exports.create = (data) => {
	var product = new Product(data);
	product.title = data.title;
	product.slug = data.slug;
	product.description = data.description;
	product.price = data.price;
	product.active = data.active;
	product.tags = data.tags;
	return product.save();

}

exports.update = (id, data) => {
	return Product.findByIdAndUpdate(id, {
		$set: {
			title: data.title,
			description: data.description,
			slug: data.slug,
			price: data.price,
			tags: data.tags
		}
	});
}

exports.delete = (id) => {
	return Product.findByIdAndDelete(id);
}