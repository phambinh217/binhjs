'use strict';

const userModel = require('@/app/models/userModel');
const accessTokenModel = require('@/app/models/accessTokenModel');
const jwt = require('@/app/libraries/jwt');

function find (id) {
    return userModel.findById(id);
}

function findByEmail (email) {
    return userModel.findOne({ email: email });
}

function create (data) {
    return userModel.create(data);
}

function createAccessToken (user, deviceName) {
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

function getAccessTokenForDevice (user, deviceName) {
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
