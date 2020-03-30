'use strict';

const { affiliatedUrl } = require('@/app/helpers/url');

function formatShop (shopeeShopData) {
    return {
        id: shopeeShopData.data.shopid,
        name: shopeeShopData.data.account.username,
        place: shopeeShopData.data.place,
        thumbnail: `https://cf.shopee.vn/file/${shopeeShopData.data.account.portrait}_tn`,
        responseRate: shopeeShopData.data.response_rate,
        url: affiliatedUrl(`https://shopee.vn/${shopeeShopData.data.account.username}`)
    }
}

module.exports = formatShop;
