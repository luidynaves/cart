'use strict';

const Cart = require('../../../modules/cart');

module.exports = class CartController {

    addItem(request, reply) {        

        var cart = new Cart();
        cart.addItem(request.payload);

        return reply('saved');
    }
};