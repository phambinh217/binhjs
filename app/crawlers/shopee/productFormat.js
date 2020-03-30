'use strict';

const { strSlug } = require('@/app/helpers/str');

function formatProduct (shopeeProductData, collection) {
    let images = shopeeProductData.images.map(image => {
        return `https://cf.shopee.vn/file/${image}`;
    });

    let variants = shopeeProductData.models.map(model => {
        return {
            id: model.modelid,
            title: model.name,
            price: model.price/100000,
            originalPrice: model.price_before_discount,
            currency: model.currency,
        }
    });

    let attributes = shopeeProductData.attributes.map(attribute => {
        return {
            id: attribute.id,
            name: attribute.name,
            value: attribute.value,
        }
    });

    let featuredImage = `https://cf.shopee.vn/file/${shopeeProductData.image}`;
    let uniqueId = `shopee:${shopeeProductData.itemid}`;
    let price = shopeeProductData.price/100000;
    let originalPrice = shopeeProductData.price_before_discount/100000;

    let rating = {
        average: shopeeProductData.item_rating.rating_star,
        total: shopeeProductData.item_rating.rating_count.shift(),
        details: shopeeProductData.item_rating.rating_count
    }

    let source = {
        name: 'shopee',
        productId: shopeeProductData.itemid,
        shopId: shopeeProductData.shopid,
    }

    let slug = strSlug(shopeeProductData.name.trim());

    let hashtags = shopeeProductData.hashtag_list.map(hashtag => {
        return hashtag.replace(/#/g, '');
    });

    return {
        title: shopeeProductData.name,
        price: price,
        currency: shopeeProductData.currency,
        originalPrice: originalPrice,
        images: images,
        isFreeShipping: shopeeProductData.show_free_shipping,
        location: shopeeProductData.shop_location,
        rating: rating,
        attributes: shopeeProductData.attributes,
        description: shopeeProductData.description,
        variants: variants,
        options: shopeeProductData.tier_variations,
        soldCount: shopeeProductData.historical_sold,
        commentedCount: shopeeProductData.cmt_count,
        featuredImage: featuredImage,
        hashtags: hashtags,
        uniqueId: uniqueId,
        collections: [collection.id],
        priceHistories: [{
            price: price,
            date: new Date(),
        }],
        status: 1,
        slug: slug,
        source: source,
    };
}

module.exports = formatProduct;
