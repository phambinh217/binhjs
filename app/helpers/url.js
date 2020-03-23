'use strict';

require('dotenv').config();

const appConfig = require('@/config/app');
const affiliateConfig = require('@/config/affiliate');

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

function affiliatedUrl (url) {
    url = encodeURIComponent(url);
    let publisherId = affiliateConfig.accesstrade.pubId;
    let utmSource = affiliateConfig.accesstrade.utmSource;
    let utmMedium = affiliateConfig.accesstrade.utmMedium;
    let utmContent = affiliateConfig.accesstrade.utmContent;
    let utmCampaign = affiliateConfig.accesstrade.utmCampaign;
    let content = `https://go.isclix.com/deep_link/${publisherId}?url=${url}`;

    if (utmSource) {
        content += `&utm_source=${utmSource}`;
    }
    if (utmMedium) {
        content += `&utm_medium=${utmMedium}`;
    }
    if (utmContent) {
        content += `&utm_content=${utmContent}`;
    }
    if (utmCampaign) {
        content += `&utm_campaign=${utmCampaign}`;
    }

    return content;
}

module.exports = {
    appUrl,
    affiliatedUrl,
}
