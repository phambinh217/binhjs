'use strict';

let jwt = require('jsonwebtoken');
let authConfig = require('@/config/auth');

exports.sign = function (data) {
    return jwt.sign(data, authConfig.jwt.secret)
},

exports.verify = function (token, handle) {
    return jwt.verify(token, authConfig.jwt.secret, handle);
}
