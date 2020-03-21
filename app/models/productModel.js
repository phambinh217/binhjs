'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    uniqueId: {
        type: String,
        unique: true,
    },
    title: String,
    price: Number,
    originalPrice: Number,
    featuredImage: String,
    images: Array,
    isFreeShipping: Boolean,
    location: String,
    rating: {
        average: Number,
        total: Number,
        details: Array,
    },
    attributes: Array,
    description: String,
    variants: Array,
    options: Array,
    hashtags: Array,
    currency: String,
    commentedCount: Number,
    soldCount: Number,
    slug: String,
    status: Number,
    source: {
        name: String,
        productId: Number,
        shopId: Number
    },
    collections: Array,
    priceHistories: Array,
    isImportant: {
        type: Boolean,
        default: false
    },
    isBlamed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});

let productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
