'use strict';

require('dotenv').config();

const appConfig = require('@/config/app');

function parseQuery (str) {
    str = str.replace(/&amp;/ig, '&');
    let path = str;
    let query = {};

    let firstQuestionMarkIndex = str.indexOf('?');
    if (firstQuestionMarkIndex > -1) {
        path = rtrim(str.slice(0, firstQuestionMarkIndex), '/');
        let keyValuePairs = str.slice(firstQuestionMarkIndex + 1, str.length).split('&');
        for (let keyValuePair of keyValuePairs) {
            keyValuePair = keyValuePair.split('=');
            query[keyValuePair[0]] = keyValuePair[1];
        }
    }

    return {
        query: query,
        path: path,
    }
}

function url (baseUrl, append, params) {
    let { path, query } = parseQuery(append);
    params = {
        ...query,
        ...params,
    }

    let url = baseUrl + '/' + path;
    let queryString = serialize(params);

    if (queryString.length) {
        url += '?' + queryString;
    }

    return url;
}

function appUrl (append, params) {
    return url(appConfig.url, append, params);
}

module.exports = {
    appUrl,
}
