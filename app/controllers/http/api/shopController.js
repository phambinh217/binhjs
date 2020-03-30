'use strict';

const crawlShop = require('@/app/crawlers/shopee/shopCrawler');
const formatShop = require('@/app/crawlers/shopee/shopFormat');

async function getDetailShop (req, res) {
    let shopId = req.params.shopId;
    let { data: response } = await crawlShop(shopId);
    let shopInfo = formatShop(response);

    return res.json({
        status: 'success',
        shop: shopInfo,
    });
}

module.exports = {
    getDetailShop
}
