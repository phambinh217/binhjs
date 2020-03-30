'use strict';
/*
Lấy mã giảm giá theo shop id
GET https://shopee.vn/api/v2/voucher_wallet/get_shop_vouchers_by_shopid?shopid=34908080&with_claiming_status=false
 */

const axios = require('axios');

function shopVoucherCrawler (shopId) {
    return axios.get(`https://shopee.vn/api/v2/voucher_wallet/get_shop_vouchers_by_shopid?shopid=${shopId}&with_claiming_status=false`);
}

module.exports = shopVoucherCrawler;
