const mongoose = require('mongoose');
const validation = require('micro-joi');


let productSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    image: String,
});

productSchema = validation(Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.String()
}))

module.exports = mongoose.model('products', productSchema);
