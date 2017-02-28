'use strict';
const Joi = require('joi');

const CartValidator = {
    addItem
}

module.exports = CartValidator;

function addItem() {
    return {
        payload: {
            productSkuId: Joi.string().trim().required(),
            vendorId: Joi.number().required(),
            productName: Joi.string().trim().required(),
            productId: Joi.string().trim().required(),
            categoryName: Joi.string().trim().required(),
            categoryId: Joi.string().trim().required(),
            productImageUrl: Joi.string().trim(),
            quantity: Joi.number().min(0).required(),
            sellingPrice: Joi.number().required(),
            vendorSku: Joi.string().trim(),
            defaultPrice: Joi.number().required(),        
        }
    }
}