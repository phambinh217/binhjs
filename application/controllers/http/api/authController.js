'use strict';

let userRepo = require('@application/repos/userRepo');
let accessTokenRepo = require('@application/repos/accessTokenRepo');
let bcryptHelper = require('@application/helpers/bcrypt');

module.exports = {
    async register (req, res) {
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
    },

    async login (req, res) {
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
    },

    async refreshAccessToken (req, res) {
        let accessToken = req.auth.accessToken;
        accessToken = await accessTokenRepo.extend(accessToken);

        return res.json({
            status: 'success',
            accessToken: accessToken.accessToken,
            refreshToken: accessToken.refreshToken
        });
    },

    async logout (req, res) {
        let auth = req.auth;
        accessTokenRepo.delete(auth.accessToken);

        return res.json({
            status: 'success',
        });
    }
}
