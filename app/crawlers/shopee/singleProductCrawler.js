'use strict';

const axios = require('axios');

function singleProductCrawler (productId, shopId) {
    let url = `https://shopee.vn/api/v2/item/get?itemid=${productId}&shopid=${shopId}`;
    return axios.get(url);
}

module.exports = singleProductCrawler;
