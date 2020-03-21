'use strict';

const jwt = require('jsonwebtoken');
const authConfig = require('@/config/auth');

function sign (data) {
    return jwt.sign(data, authConfig.jwt.secret)
}

function verify (token, handle) {
    return jwt.verify(token, authConfig.jwt.secret, handle);
}

module.exports = {
    sign,
    verify,
}
