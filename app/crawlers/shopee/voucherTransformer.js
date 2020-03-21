'use strict';

function voucherTransformer (shopeeVoucher, categoryId, shop) {
    let shopId = shop.shopid || shopeeVoucher.shop_id;
    let shopName = shop.brand_name || shopeeVoucher.shop_name;

    return {
        code: shopeeVoucher.voucher_code,
        uniqueId: `shopee:${shopeeVoucher.voucher_code}`,
        source: {
            name: 'shopee',
            shopId: shopId,
            shopName: shopName,
        },
        categoryId: categoryId,
        description: shopeeVoucher.usage_terms,
        expiriedAt: new Date(shopeeVoucher.end_time * 1000),
        coinCap: shopeeVoucher.coin_cap,
        coinPercentage: shopeeVoucher.coin_percentage,
        discountPercentage: shopeeVoucher.discount_percentage,
        minSpend: shopeeVoucher.min_spend ? shopeeVoucher.min_spend/100000 : null,
        maxValue: shopeeVoucher.max_value ? shopeeVoucher.max_value/100000 : null,
        discountValue: shopeeVoucher.discount_value ? shopeeVoucher.discount_value/100000 : null,
        type: shopeeVoucher.shopee_wallet_only ? 2 : 1,
    }
}

module.exports = voucherTransformer;
