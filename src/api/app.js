'use strict';

const Hapi = require('hapi');
const mongoConfig = require('../config/mongoConfig');

const server = new Hapi.Server();

const controllers = require('./controllers');

server.connection({ port: 1337, host: '127.0.0.1' });

const dbOpts = {
    url: `mongodb://${mongoConfig.hostname}:${mongoConfig.port}/${mongoConfig.pathname}`,
    settings: {
        poolSize: 10
    },
    decorate: true
};

server.register(
    {
        register: require('hapi-mongodb'),
        options: dbOpts
    }, 
    function(err) {
        if (err) {
            console.log(err);
            throw err;
        }
    },

    server.route(controllers),

    server.start((err) => {
        if (err) {
            throw err;
        }

        console.log(`Server running at ${server.info.uri}`);
    })
);