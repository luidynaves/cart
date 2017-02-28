'use strict';
const _ = require('lodash');
const CartModel = require('./model').CartModel;

module.exports = class Cart {    

    constructor() {        
        this.items = [];

        this.EXPIRE_TIME = 5;
    }

    _isEmpty() {
        return _.isEmpty(this.items);
    }

    addItem(item, cartId) {
        if (!cartId) {
            this._create(item);
            return;
        }        

        this.model = CartModel.findOneAndUpdate({ _id: cartId }, { $set: { items: [ item ] }}, { upsert: true }, function(err, model) { return model; });

        this._save();
    }

    _create(item) {

        let cartModel = {
            expire: this._calculateExpireDate(),
            items: [ item ]
        };

        this.model = new CartModel(cartModel);        
        this._save();
    }

    _calculateExpireDate() {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + this.EXPIRE_TIME);

        return expireDate;
    }

    _save() {
        this.model.save();
    }
    
};
