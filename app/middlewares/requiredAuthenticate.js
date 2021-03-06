'use strict';

const jwt = require('@/app/libraries/jwt');
const userRepo = require('@/app/repos/userRepo');
const accessTokenRepo = require('@/app/repos/accessTokenRepo');

async function requiredAuthenticate (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.json({
            success: false,
            message: 'Vấn đề xác thực'
        }, 200);
    }

    let accessToken = await accessTokenRepo.findByAccessToken(token);

    // let userAgent = req.headers['user-agent'];

    // if (accessToken.deviceName !== userAgent) {
    //     return res.json({
    //         status: 'failed',
    //         message: 'Vấn đề xác thực'
    //     }, 200);
    // }

    if (!accessToken) {
        return res.json({
            status: 'failed',
            message: 'Vấn đề xác thực'
        }, 200);
    }

    if (accessToken.isExpired) {
        return res.json({
            status: 'failed',
            message: 'Hết phiên đăng nhập'
        }, 200);
    }

    let user = await userRepo.find(accessToken.userId);

    req.auth = {
        user: user,
        accessToken: accessToken,
    }

    next();
}

module.exports = requiredAuthenticate;
