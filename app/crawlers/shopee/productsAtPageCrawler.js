'use strict';

const axios = require('axios');

function crawlProductsAtPage (options, page) {
    let offset = (options.limit * page) - options.limit;
    let queryString = encodeURI(`by=${options.by}&keyword=${options.keyword}&limit=${options.limit}&newest=${offset}`);
    let searchUrl = `https://shopee.vn/api/v2/search_items/?order=desc&page_type=search&version=2&${queryString}`;

    return axios.get(searchUrl, {
        headers: {
            'referer': 'https://shopee.vn',
        }
    });
}

module.exports = crawlProductsAtPage;
