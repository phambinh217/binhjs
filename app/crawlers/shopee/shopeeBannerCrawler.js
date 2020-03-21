'use strict';

const axios = require('axios');

function crawlShopeeBaner (data) {
    let url = `https://shopee.vn/api/banner/batch_list`;
    let dataString = JSON.stringify(data);

    return axios.post(url, dataString, {
        headers: {
            'referer': 'https://shopee.vn',
        }
    });
}

module.exports = crawlShopeeBaner;
