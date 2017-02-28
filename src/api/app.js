'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const mongoConnect = require('../config/mongoConnect');

const server = new Hapi.Server();

const controllers = require('./controllers');

server.connection({ port: 1337, host: '127.0.0.1' });

const swaggerOptions = {
    info: {
            'title': 'Test API Documentation',
            'version': '1',
        }
    };

server.register([
        // Inert,
        // Vision,
        // { 
        //     register: require('hapi-swagger'), 
        //     options: swaggerOptions
        // },        
    ],
    
    function (err) { 
        if (err) { 
            console.error(['error'], ' ' + err);
        } else { 
            console.log(['start'], 'plugins loaded');
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