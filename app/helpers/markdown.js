'use strict';

const marked = require('marked');
const fs = require('fs');

function markFromPath (path) {
    let content = fs.readFileSync(path, 'utf8');
    return marked(content);
}

module.exports = {
    markFromPath
}
