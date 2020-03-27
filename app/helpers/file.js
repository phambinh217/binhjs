'use strict';

const fs = require('fs');

function filePutContent (path, content) {
    return fs.writeFileSync(path, content);
}

function fileGetContent (path, charset) {
    if (!charset) {
        charset = 'utf8';
    }

    return fs.readFileSync(path, charset);
}

module.exports = {
    filePutContent,
    fileGetContent,
}
