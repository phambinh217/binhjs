'use strict';

require('dotenv').config();

const appConfig = require('@/config/app');
const affiliateConfig = require('@/config/affiliate');

function appUrl (append) {
    while (append[0] == '/') {
        append = append.substring(1)
    }

    return appConfig.url + append;
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
