'use strict';

const productRepo = require('@/app/repos/productRepo');

async function getDetailProductRequest (req, res, next) {
    let productUniqueId = req.params.uniqueId;
    let product = await productRepo.findByUniqueId(productUniqueId);

    if (!product) {
        return res.json({
            status: 'error',
            message: 'Product not found'
        });
    }

    req._ = req._ || {};
    req._.product = product;

    next();
}

module.exports = getDetailProductRequest;
