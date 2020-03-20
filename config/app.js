'use strict';

require('dotenv').config();

module.exports = {
    url: process.env.APP_URL || 'http://localhost:3000',
    env: process.env.NODE_ENV,
    timezone: 'Asia/Ho_Chi_Minh',
}
