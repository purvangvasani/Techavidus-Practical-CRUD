const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModel = new Schema({
    file: { type: String },
    productName: { type: String },
    detail: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    totalPrice: { type: Number },
}, {
    collection: 'ProductModel',
    timestamps: true
});

module.exports = mongoose.model('ProductModel', ProductModel);