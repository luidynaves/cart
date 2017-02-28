'use strict';

const mongoose = require('mongoose');
const mongoConfig = require('./mongoConfig');

let connectionString = `mongodb://${mongoConfig.hostname}:${mongoConfig.port}/${mongoConfig.pathname}`;
module.exports = mongoose.connect(connectionString);