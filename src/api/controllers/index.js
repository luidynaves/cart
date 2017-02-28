'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function getModuleNames() {
    let array = getDirectories(__dirname);

    for (let i = 0; i < array.length; i++) {
        let modul = './' + array[i];
        array[i] = require(modul);  
    }

    return _.flattenDeep(array);
}();

function getDirectories(dirPath) {
    return fs.readdirSync(dirPath)
        .filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());
}