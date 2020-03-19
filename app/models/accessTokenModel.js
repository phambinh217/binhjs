'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Types = Schema.Types;

let accessTokenSchema = new Schema({
    accessToken: String,
    refreshToken: String,
    deviceName: String,
    userId: Types.ObjectId,
    accessTokenExpiredAt: Date,
    refreshTokenExpiredAt: Date,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});

let accessTokenModel = mongoose.model('AccessToken', accessTokenSchema);

module.exports = accessTokenModel;
