'use strict';

require('dotenv').config();

exports.appUrl = function (append) {
    while (append[0] == '/') {
        append = append.substring(1)
    }

    return process.env.APP_URL + append;
}
