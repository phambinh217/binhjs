'use strict';

let productRepo = require('@/app/repos/productRepo');

async function standardFormatCollection (collection) {
    let totalProduct = await productRepo.count({ collections: { $in: collection.id }});

    return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        image: collection.image,
        totalProduct: totalProduct,
    }
}

module.exports = {
    standardFormatCollection
}
