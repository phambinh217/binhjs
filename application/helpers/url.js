'use strict';

require('dotenv').config();

module.exports = {
    url (baseUrl, params, exceptedParams) {
        let queryString = Object.keys(params)
            .filter(key => {
                if (Array.isArray(exceptedParams)) {
                    return exceptedParams.indexOf(key) == -1;
                }
                return true;
            }).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            }).join('&');

        if (baseUrl.indexOf('?') == -1) {
            baseUrl += '?';
        }

        return baseUrl + queryString;
    },

    appUrl (append) {
        while (append[0] == '/') {
            append = append.substring(1)
        }

        return process.env.APP_URL + append;
    }
}
