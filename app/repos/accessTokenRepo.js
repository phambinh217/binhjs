'use strict';

const jwt = require('@/app/libraries/jwt');
const accessTokenModel = require('@/app/models/accessTokenModel');

const extend = function (accessTokenRecord) {
    accessTokenRecord.remove();

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
}

const findByAccessToken = function (accessTokenString) {
    return accessTokenModel.findOne({
        accessToken: accessTokenString
    });
}

const findByRefreshToken = function (refreshToken) {
    return accessTokenModel.findOne({
        refreshToken: refreshToken
    });
}

const remove = function (accessTokenRecord) {
    return accessTokenRecord.remove();
}

module.exports = {
    extend,
    findByAccessToken,
    findByRefreshToken,
    remove,
}
