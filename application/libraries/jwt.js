'use strict';

let jwt = require('jsonwebtoken');
let authConfig = require('@application/config/auth');

module.exports = {
    sign (data) {
        return jwt.sign(data, authConfig.jwt.secret)
    },

    verify (token, handle) {
        return jwt.verify(token, authConfig.jwt.secret, handle);
    }
}
