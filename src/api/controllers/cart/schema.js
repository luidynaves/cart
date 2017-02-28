'use strict';
const Joi = require('joi');

const CartValidator = {
    addItem
};

module.exports = CartValidator;

function addItem() {
    return {
        payload: {            
            productName: Joi.string().trim().required(),
            productId: Joi.string().trim().required(),
            categoryName: Joi.string().trim().required(),
            categoryId: Joi.string().trim().required(),
            quantity: Joi.number().min(0).required(),
            sellingPrice: Joi.number().required(),
            defaultPrice: Joi.number().required()
        }
    };
}