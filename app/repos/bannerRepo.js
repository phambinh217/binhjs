'use strict';

const bannerModel = require('@/app/models/bannerModel');

function create (data) {
    return bannerModel.create(data);
}

function all (options) {
    return bannerModel.find(options);
}

function find (productId) {
    return bannerModel.findById(productId);
}

function findOne (options) {
    return bannerModel.findOne(options);
}

function deleteAll () {
    return bannerModel.deleteMany({});
}

module.exports = {
    create,
    all,
    find,
    findOne,
    deleteAll,
}
