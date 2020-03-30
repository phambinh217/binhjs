'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bannerSchema = new Schema({
    image: String,
    url: String,
    location: String,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});

let bannerModel = mongoose.model('Banner', bannerSchema);

module.exports = bannerModel;
