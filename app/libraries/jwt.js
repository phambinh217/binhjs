'use strict';

const jwt = require('jsonwebtoken');
const authConfig = require('@/config/auth');

const sign = function (data) {
    return jwt.sign(data, authConfig.jwt.secret)
}

const verify = function (token, handle) {
    return jwt.verify(token, authConfig.jwt.secret, handle);
}

module.exports = {
    sign,
    verify,
}
