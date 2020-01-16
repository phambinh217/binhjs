'use strict';

let jwt = require('@application/libraries/jwt');
let accessTokenModel = require('@application/models/accessTokenModel');

module.exports = {
    extend (accessTokenRecord) {
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

    findByAccessToken (accessTokenString) {
        return accessTokenModel.findOne({
            accessToken: accessTokenString
        });
    },

    findByRefreshToken (refreshToken) {
        return accessTokenModel.findOne({
            refreshToken: refreshToken
        });
    },

    delete (accessTokenRecord) {
        return accessTokenRecord.remove();
    }
}
