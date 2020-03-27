'use strict';

const productModel = require('@/app/models/productModel');

function all (options) {
    return productModel.find(options);
}

function find (productId) {
    return productModel.findById(productId);
}

function findOne (options) {
    return productModel.findOne(options);
}

function findByUniqueId (uniqueId) {
    return productModel.findOne({ uniqueId: uniqueId });
}

function update (product, productData) {
    for (let field in productData) {
        product[field] = productData[field];
    }

    product.save();
}

function count (options) {
    return productModel.countDocuments(options);
}

function collectFromCrawler (productData, collection, options) {
    let onCreated = options.onCreated || function () {};
    let onUpdated = options.onUpdated || function () {};
    let onFailed = options.onFailed || function () {};

    productModel.create(productData, (error, createdProduct) => {
        if (error) {
            if (error.errmsg.includes('E11000 duplicate key error collection:')) {
                productModel.findOne({ uniqueId: productData.uniqueId }, (error, createdProduct) => {
                    if (createdProduct.collections.indexOf(collection.id) == -1) {
                        createdProduct.collections.push(collection.id);
                    }
                    if (collection.parentId && createdProduct.collections.indexOf(collection.parentId) == -1) {
                        createdProduct.collections.push(collection.parentId);
                    }
                    createdProduct.rating = productData.rating || createdProduct.rating;
                    createdProduct.price = productData.price || createdProduct.price;
                    createdProduct.originalPrice = productData.originalPrice || createdProduct.originalPrice;
                    createdProduct.soldCount = productData.soldCount || createdProduct.soldCount;
                    createdProduct.commentedCount = productData.commentedCount || createdProduct.commentedCount;
                    createdProduct.featuredImage = productData.featuredImage || createdProduct.featuredImage;
                    createdProduct.hashtags = productData.hashtags || createdProduct.hashtags;
                    createdProduct.status = productData.status || createdProduct.status;

                    let productDataPriceHistory = productData.priceHistories[0];

                    if (Array.isArray(createdProduct.priceHistories) && createdProduct.priceHistories.length) {
                        let latestPrice = createdProduct.priceHistories[createdProduct.priceHistories.length - 1];
                        if (latestPrice.price != productDataPriceHistory.price) {
                            createdProduct.priceHistories.push(productDataPriceHistory);
                        }
                    } else {
                        createdProduct.priceHistories.push(productDataPriceHistory);
                    }

                    createdProduct.save();
                    onUpdated(createdProduct);
                });
            } else {
                onFailed(productData);
            }
        } else {
            onCreated(createdProduct);
        }
    });
}

function updatedProductFromCrawler (uniqueId, productData) {
    productModel.findOne({ uniqueId: uniqueId }, (error, createdProduct) => {
        createdProduct.rating = productData.rating || createdProduct.rating;
        createdProduct.price = productData.price || createdProduct.price;
        createdProduct.originalPrice = productData.originalPrice || createdProduct.originalPrice;
        createdProduct.soldCount = productData.soldCount || createdProduct.soldCount;
        createdProduct.commentedCount = productData.commentedCount || createdProduct.commentedCount;
        createdProduct.featuredImage = productData.featuredImage || createdProduct.featuredImage;
        createdProduct.hashtags = productData.hashtags || createdProduct.hashtags;
        createdProduct.status = productData.status || createdProduct.status;

        let productDataPriceHistory = productData.priceHistories[0];

        if (Array.isArray(createdProduct.priceHistories) && createdProduct.priceHistories.length) {
            let latestPrice = createdProduct.priceHistories[createdProduct.priceHistories.length - 1];
            if (latestPrice.price != productDataPriceHistory.price) {
                createdProduct.priceHistories.push(productDataPriceHistory);
            }
        } else {
            createdProduct.priceHistories.push(productDataPriceHistory);
        }

        createdProduct.save();
    });
}

module.exports = {
    all,
    find,
    findOne,
    findByUniqueId,
    update,
    count,
    collectFromCrawler,
    updatedProductFromCrawler,
}
