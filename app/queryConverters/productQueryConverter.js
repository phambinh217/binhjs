'use strict';

function convertProductQuery (options, query) {
    options = options || {};
    query = query || {};

    query.status = 1;

    if ('price_range' in options) {
        let priceRange = options.price_range.split('-');
        let minPrice = Number(priceRange[0]);
        let maxPrice = Number(priceRange[1]);

        if (maxPrice == 0) {
            query.price = {
                $gte: minPrice
            }
        } else if (maxPrice > minPrice) {
            query.price = {
                $gte: minPrice,
                $lte: maxPrice
            }
        }
    }

    if ('sale_status' in options && options.sale_status == 'sale') {
        query.originalPrice = {
            $gt: 0
        }
    }

    if ('shipping_status' in options && options.shipping_status == 'free') {
        query.isFreeShipping = true;
    }

    if ('collection' in options && options.collection != 'all') {
        query.collections = { $in: Number(options.collection) };
    }

    if ('hashtag' in options) {
        query.hashtags = { $in: options.hashtag };
    }

    if ('q' in options || 'keyword' in options) {
        let keyword = options.q || options.keyword;
        let regexKeyword = new RegExp(keyword);
        query.title = regexKeyword;
    }

    return query;
}

module.exports = convertProductQuery;
