'use strict';

const axios = require('axios');

function getDetailShop (shopId) {
    let url = `https://shopee.vn/api/v2/shop/get?is_brief=1&shopid=${shopId}`;
    return axios.get(url);
}

module.exports = getDetailShop;
