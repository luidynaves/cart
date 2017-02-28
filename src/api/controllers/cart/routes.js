'use strict';

const Controller = require('./controller');
const Validator = require('./schema');

let controller = new Controller();

module.exports = [
        {
            method: 'GET',
            path: '/cart',
            config: {
                auth: false,
                handler: controller.addItem,
                //validate: Validator.addItem()
            }
        }
    ];

