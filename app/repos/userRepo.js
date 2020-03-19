'use strict';

const userModel = require('@/app/models/userModel');
const accessTokenModel = require('@/app/models/accessTokenModel');
const jwt = require('@/app/libraries/jwt');

const find = function find (id) {
    return userModel.findById(id);
}

const findByEmail = function (email) {
    return userModel.findOne({ email: email });
}

const create = function (data) {
    return userModel.create(data);
}

const createAccessToken = function (user, deviceName) {
    let now = new Date();
    let accessTokenString = jwt.sign({ userId: user._id, salt: now.getTime() });
    let refreshTokenString = jwt.sign({ userId: user._id, salt: now.getTime() * 10 });
    let accessTokenExpiredAt = (new Date()).setDate(now.getDate() + 7);
    let refreshTokenExpiredAt = (new Date()).setDate(now.getDate() + 10);

    return accessTokenModel.create({
        userId: user._id,
        accessToken: accessTokenString,
        refreshToken: refreshTokenString,
        accessTokenExpiredAt: accessTokenExpiredAt,
        refreshTokenExpiredAt: refreshTokenExpiredAt,
        deviceName: deviceName,
    });
}

const getAccessTokenForDevice = function (user, deviceName) {
    return accessTokenModel.findOne({
        userId: user._id,
        deviceName: deviceName
    });
}

module.exports = {
    find,
    findByEmail,
    create,
    createAccessToken,
    getAccessTokenForDevice,
}
