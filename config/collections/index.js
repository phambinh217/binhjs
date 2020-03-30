'use strict';

const testFolder = './config/collections/';
const fs = require('fs');
const path = require('path');

let exportData = [];

let files = fs.readdirSync(testFolder);
for (let file of files) {
    if (file != 'index.js') {
        let filePath = path.resolve(__dirname, file);
        exportData.push(require(filePath));
    }
}

module.exports = exportData;

