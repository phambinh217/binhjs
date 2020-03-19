'use strict';

let jwt = require('@/app/libraries/jwt');
let accessTokenModel = require('@/app/models/accessTokenModel');

exports.extend = function (accessTokenRecord) {
    this.delete(accessTokenRecord);

    let now = new Date();
    let accessTokenString = jwt.sign({ userId: accessTokenRecord.userId, salt: now.getTime() });
    let refreshTokenString = jwt.sign({ userId: accessTokenRecord.userId, salt: now.getTime() * 10 });
    let accessTokenExpiredAt = (new Date()).setDate(now.getDate() + 7);
    let refreshTokenExpiredAt = (new Date()).setDate(now.getDate() + 10);

    return accessTokenModel.create({
        userId: accessTokenRecord.userId,
        accessToken: accessTokenString,
        refreshToken: refreshTokenString,
        accessTokenExpiredAt: accessTokenExpiredAt,
        refreshTokenExpiredAt: refreshTokenExpiredAt,
        deviceName: accessTokenRecord.deviceName,
    });
},

exports.findByAccessToken = function (accessTokenString) {
    return accessTokenModel.findOne({
        accessToken: accessTokenString
    });
},

exports.findByRefreshToken = function (refreshToken) {
    return accessTokenModel.findOne({
        refreshToken: refreshToken
    });
},

exports.delete = function (accessTokenRecord) {
    return accessTokenRecord.remove();
}
