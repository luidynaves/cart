'use strict';

module.exports = {    
    port: process.env.DB_PORT || 27017,
    hostname: process.env.DB_HOST || 'localhost',
    pathname: process.env.DB_NAME || 'cart'    
};