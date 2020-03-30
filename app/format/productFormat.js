'use strict';

const { moneyFormat } = require('@/app/helpers/money');
const { nl2br } = require('@/app/helpers/str');
const { affiliatedUrl } = require('@/app/helpers/url');

function injectProductUrls (product) {
    product.affiliatedUrl = null;

    if (product.source.name == 'shopee') {
        let url = `https://shopee.vn/${product.slug}-i.${product.source.shopId}.${product.source.productId}`;
        product.affiliatedUrl = affiliatedUrl(url);
    }
}

function simpleFormatProduct (product) {
    if (!product) {
        return null;
    }

    injectProductUrls(product);
    product.formatedOriginalPrice = moneyFormat(product.originalPrice);
    product.formatedPrice = moneyFormat(product.price);

    return {
        uniqueId: product.uniqueId,
        title: product.title,
        url: product.url,
        affiliatedUrl: product.affiliatedUrl,
        price: product.price,
        currency: product.currency,
        originalPrice: product.originalPrice,
        isFreeShipping: product.isFreeShipping,
        images: product.images,
        variants: product.variants,
        collections: product.collections,
        location: product.location,
        soldCount: product.soldCount,
        commentedCount: product.commentedCount,
        featuredImage: product.featuredImage,
        slug: product.slug,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    }
}

function standardformatProduct (product) {
    if (!product) {
        return null;
    }

    let simpleFormatedProduct = simpleFormatProduct(product);
    let htmlDescription = nl2br(product.description.trim());

    let advancedProduct = {
        htmlDescription,
        hashtags: product.hashtags,
        source: {
            shopId: product.source.shopId,
        },
        priceHistories: product.priceHistories,
        attributes: product.attributes,
        rating: product.rating,
    }

    return {
        ...simpleFormatedProduct,
        ...advancedProduct,
    }
}

module.exports = {
    standardformatProduct,
    simpleFormatProduct
};
