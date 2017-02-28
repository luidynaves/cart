'use strict';
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mongoose = require('mongoose');
require('sinon-as-promised');
require('sinon-mongoose');
const CartModel = require('./model').CartModel;
let expect = chai.expect;

const Cart = require('./cart');

describe('Cart unit test', () => {

    before(() => chai.use(sinonChai));    

    describe('Add items at cart', () => {

        beforeEach(() => this.sandbox = sinon.sandbox.create() );

        afterEach(() => this.sandbox.restore() );

        it('must add successful item into current cart', () => {
            
            var _id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 5);

            var item = { 
                productName: 'Produto X',
                productId: 'X1',
                categoryName: 'Alimentos',
                categoryId: 20,
                sellingPrice: 8,
                defaultPrice: 9.99,
                quantity: 1
            };

            var cartModel = new CartModel({ _id: _id, expire: expireDate, dealt: false, items: [ item ] });            

            this.sandbox.stub(CartModel.prototype, 'constructor').returns(cartModel);                        

            var item2 = { 
                productName: 'Produto Y',
                productId: 'X2',
                categoryName: 'Alimentos',
                categoryId: 25,
                sellingPrice: 4.49,
                defaultPrice: 7.29,
                quantity: 1
            };
            
            cartModel.items.push(item2);
            this.sandbox.stub(CartModel, 'findOneAndUpdate').returns(cartModel);

            var cart = new Cart();
            cart.addItem(item);            

            cart.addItem(item2, _id);

            expect(cart.model.items.length).to.be.above(1);
        });

        it('must increase product quantity for product added before', () => {

            var _id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 5);

            var item = { 
                productName: 'Produto X',
                productId: 'X1',
                categoryName: 'Alimentos',
                categoryId: 20,
                sellingPrice: 8,
                defaultPrice: 9.99,
                quantity: 1
            };

            var cartModel = new CartModel({ _id: _id, expire: expireDate, dealt: false, items: [ item ] });            

            this.sandbox.stub(CartModel.prototype, 'constructor').returns(cartModel);                                    
            
            item.quantity = 2;

            cartModel.items[0] = item;

            this.sandbox.stub(CartModel, 'findOneAndUpdate').returns(cartModel);

            var cart = new Cart();
            cart.addItem(item);            

            cart.addItem(item, _id);

            expect(cart.items.length).to.be.equal(1);
            expect(item[0].quantity).to.be.equal(2);
        });

        it('must create cart whether not exists and add item', () => {

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 5);

            var item = { 
                productName: 'Produto X',
                productId: 'X1',
                categoryName: 'Alimentos',
                categoryId: 20,
                sellingPrice: 8,
                defaultPrice: 9.99,
                quantity: 1
            };

            var cartModel = new CartModel({ expire: expireDate, dealt: false, items: [ item ] });            

            this.sandbox.stub(CartModel.prototype, 'constructor').returns(cartModel);

            var cart = new Cart();

            cart.addItem(item);

            expect(cart.model.dealt).to.be.equal(cartModel.dealt);
            expect(cart.model.expire.getDate()).to.be.equal(cartModel.expire.getDate());
            expect(cart.model.item).to.be.equal(cartModel.item);
        });
   }); 
});