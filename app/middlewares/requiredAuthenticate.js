let jwt = require('@/app/libraries/jwt');
let userRepo = require('@/app/repos/userRepo');
let accessTokenRepo = require('@/app/repos/accessTokenRepo');

module.exports = async function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.json({
            success: false,
            message: 'Vấn đề xác thực 1'
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
            message: 'Vấn đề xác thực 2'
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
