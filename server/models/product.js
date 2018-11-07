const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
});

module.exports = Product;
