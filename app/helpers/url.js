'use strict';

require('dotenv').config();

module.exports = {
    appUrl (append) {
        while (append[0] == '/') {
            append = append.substring(1)
        }

        return process.env.APP_URL + append;
    }
}
