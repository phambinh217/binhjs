'use strict';

/*
Lấy danh sách các brands, nhưng chưa phân loại brand thuộc ngành hàng nào
GET https://shopee.vn/api/v2/brand_lists/get

Danh sách các brand được phân loại theo ngành hàng, nhưng không rõ brand đó được đại diện bởi shop nào
GET https://shopee.vn/api/v2/brand_lists/cats/get?need_zhuyin=0
 */

const axios = require('axios');

async function shopeeMallGroupByCategoryCrawler () {
    let { data: brandResponse } = await axios.get('https://shopee.vn/api/v2/brand_lists/get');
    let { data: categoryResponse } = await axios.get('https://shopee.vn/api/v2/brand_lists/cats/get?need_zhuyin=0');

    let categories = categoryResponse.data.filter(cat => cat.cat_id > -1).map(cat => {
        let shops = [];
        for (let brand of cat.brands) {
            for (let brandId of brand.brand_ids) {
                let shopInfo = brandResponse.data[brandId];
                shops.push(shopInfo);
            }
        }

        return {
            id: cat.cat_id,
            name: cat.cat_name,
            shops: shops,
            totalShop: shops.length,
        }
    });

    return categories;
}

module.exports = shopeeMallGroupByCategoryCrawler;
