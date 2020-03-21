'use strict';

require('dotenv').config();

const appConfig = require('@/config/app');

function appUrl (append) {
    while (append[0] == '/') {
        append = append.substring(1)
    }

    return appConfig.url + append;
}

module.exports = {
    appUrl,
}
