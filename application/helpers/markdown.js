'use strict';

let marked = require('marked');
let fs = require('fs');

module.exports = {
    marked (content) {
        return marked(content);
    },

    markedFromFile (filePath) {
        let content = fs.readFileSync(filePath, 'utf8');
        return marked(content);
    }
}