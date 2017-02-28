'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

const controllers = require('./controllers');

server.connection({ port: 1337, host: '127.0.0.1' });

server.route(controllers);

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at ${server.info.uri}`);
});