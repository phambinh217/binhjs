'use strict';

require('dotenv').config();

module.exports = {
    jwt: {
        secret: process.env.APP_KEY,
    }
}
