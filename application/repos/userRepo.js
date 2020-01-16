'use strict';

let userModel = require('@application/models/userModel');
let accessTokenModel = require('@application/models/accessTokenModel');
let jwt = require('@application/libraries/jwt');

module.exports = {
    find (id) {
        return userModel.findById(id);
    },

    findByEmail (email) {
        return userModel.findOne({ email: email });
    },

    create (data) {
        return userModel.create(data);
    },

    createAccessToken (user, deviceName) {
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
    },

    getAccessTokenForDevice (user, deviceName) {
        return accessTokenModel.findOne({
            userId: user._id,
            deviceName: deviceName
        });
    }
}
