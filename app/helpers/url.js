'use strict';

require('dotenv').config();

const appUrl = function (append) {
    while (append[0] == '/') {
        append = append.substring(1)
    }

    return process.env.APP_URL + append;
}

module.exports = {
    appUrl,
}
