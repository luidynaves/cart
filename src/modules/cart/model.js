'use strict';
const Mongoose = require('../../infrastructure/mongooseOverride');

var cartSchema = Mongoose.Schema({
    userId: { type: Number },
    expire: { type: Date, required: true },
    dealt: { type: Boolean, default: false, required: true},
    items: [{
        productName: { type: String, required: true },
        productId: { type: String, required: true },
        categoryName: { type: String, required: true },
        categoryId: { type: Number, required: true },
        quantity: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
        defaultPrice: { type: Number, required: true }
    }]
});

module.exports.CartSchema = cartSchema;
module.exports.CartModel = Mongoose.model('Cart', cartSchema);