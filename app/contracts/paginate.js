'use strict';

module.exports = function (options) {
    let totalPage = Math.ceil(options.totalItem / options.perPage);
    let baseUrl = options.baseUrl || '/';
    if (baseUrl.indexOf('?') == -1) {
        baseUrl += '?';
    }

    return {
        baseUrl: baseUrl,
        totalItem: options.totalItem,
        totalPage: totalPage,
        currentPage: options.currentPage,
        perPage: options.perPage,
    }
}
