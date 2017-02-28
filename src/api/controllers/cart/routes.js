'use strict';

const Controller = require('./controller');
const Validator = require('./schema');

let controller = new Controller();

module.exports = [
        {
            method: 'POST',
            path: '/cart',
            config: {
                tags: [ 'api' ],
                auth: false,
                handler: controller.addItem,
                validate: Validator.addItem()
            }
        }
    ];

