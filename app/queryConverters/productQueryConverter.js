'use strict';

const { booleanString } = require('@/app/helpers/dataType');

function convertProductQuery (options, query) {
    options = options || {};
    query = query || {};

    if ('title' in options && options.title.length > 0) {
        let keyword = options.title;
        let regexKeyword = new RegExp(keyword);
        query.title = regexKeyword;
    }

    if ('source.productId' in options && options['source.productId'].length) {
        query['source.productId'] = options['source.productId'];
    }

    if ('status' in options) {
        query.status = options.status;
    }

    if ('collection' in options) {
        query.collections = { $in: options.collection };
    }

    if ('isImportant' in options) {
        query.isImportant = booleanString(options.isImportant);
    }

    return query;
}

module.exports = convertProductQuery;
