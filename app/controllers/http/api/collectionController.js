'use strict';

const collections = require('@/config/collections');
const { standardFormatCollection } = require('@/app/format/collectionFormat');

function getAllCollections (req, res) {
    let formatedCollections = [];
    for (let collection of collections) {
        formatedCollections.push(standardFormatCollection(collection));
    }

    return res.json({
        status: 'success',
        data: formatedCollections,
    });
}

module.exports = {
    getAllCollections,
}
