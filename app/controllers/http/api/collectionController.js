'use strict';

const collections = require('@/config/crawler/collections');
const { standardFormatCollection } = require('@/app/format/collectionFormat');

async function getAllCollections (req, res) {
    let formatedCollections = [];
    for (let collection of collections) {
        formatedCollections.push(await standardFormatCollection(collection));
    }

    return res.json({
        status: 'success',
        data: formatedCollections,
    });
}

module.exports = {
    getAllCollections,
}
