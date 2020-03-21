'use strict';

const userRepo = require('@/app/repos/userRepo');
const accessTokenRepo = require('@/app/repos/accessTokenRepo');
const bcryptHelper = require('@/app/helpers/bcrypt');

async function register(req, res) {
    let email = req.body.email;
    let password = await bcryptHelper.bcrypt(req.body.password);

    let user = await userRepo.create({
        email: email,
        password: password
    });

    return res.json({
        status: 'success',
        user: {
            id: user.id,
            email: user.email
        }
    });
}

async function login(req, res) {
    let email = req.body.email;
    let user = await userRepo.findByEmail(email);
    let userAgent = req.headers['user-agent'];

    let accessToken = await userRepo.getAccessTokenForDevice(user, userAgent);

    if (!accessToken) {
        accessToken = await userRepo.createAccessToken(user, userAgent);
    } else {
        accessToken = await accessTokenRepo.extend(accessToken);
    }

    return res.json({
        status: 'success',
        accessToken: accessToken.accessToken,
        refreshToken: accessToken.refreshToken,
        user: {
            id: user.id,
            email: user.email,
        }
    });
}

async function refreshAccessToken(req, res) {
    let accessToken = req.auth.accessToken;
    accessToken = await accessTokenRepo.extend(accessToken);

    return res.json({
        status: 'success',
        accessToken: accessToken.accessToken,
        refreshToken: accessToken.refreshToken
    });
}

function logout(req, res) {
    let auth = req.auth;
    accessTokenRepo.delete(auth.accessToken);

    return res.json({
        status: 'success',
    });
}

module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
}
