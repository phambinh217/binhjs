'use strict';

const accessTokenRepo = require('@/app/repos/accessTokenRepo');
const { validate } = require('@/cores/validator');

module.exports = async function (req, res, next) {
    let validToken = function (field, value) {
        return {
            getRuleName () {
                return 'validToken';
            },

            async isPass () {
                if (!value) {
                    return false;
                }
                let accessToken = await accessTokenRepo.findByRefreshToken(value);
                if (accessToken.userId != req.auth.user._id || accessToken.accessToken != req.auth.accessToken.accessToken) {
                    return false;
                }
            }
        }
    }

    let validator = await validate(req.body, {
        token: {
            rules: ['required', validToken],
            messages: {
                required: 'Token không được để trống',
                validToken: 'Token không hợp lệ',
            }
        }
    });

    if (validator.isPass() == false) {
        return res.json({
            status: 'failed',
            message: validator.getFirstErrorMessage(),
            errors: validator.getErrors(),
        });
    }

    next();
}
