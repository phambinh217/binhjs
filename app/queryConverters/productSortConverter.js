'use strict';

function convertProductSort (options, query) {
    options = options || {};

    if ('sorting' in options) {
        if (options.sorting == 'createdAtAsc') {
            return { createdAt: 'asc' };
        }
        if (options.sorting == 'isImportantDesc') {
            return { createdAt: -1 };
        }

        if (options.sorting == 'isImportantAsc') {
            return { isImportant: 'asc' };
        }
        if (options.sorting == 'statusDesc') {
            return { isImportant: 'desc' };
        }

        if (options.sorting == 'statusAsc') {
            return { status: 'asc' };
        }
        if (options.sorting == 'statusDesc') {
            return { status: 'desc' };
        }

        if (options.sorting == 'priceAsc') {
            return { price: 'asc' };
        }
        if (options.sorting == 'priceDesc') {
            return { price: 'desc' };
        }
    }

    return { createdAt: -1 };
}

module.exports = convertProductSort;
