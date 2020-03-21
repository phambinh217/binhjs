'use strict';

const userRepo = require('@/app/repos/userRepo');
const bcryptHelper = require('@/app/helpers/bcrypt');
const { validate } = require('@/cores/validator');

function accountMustExisted (field, value) {
    return {
        getRuleName () {
            return 'accountMustExisted';
        },

        async isPass () {
            let password = req.body.password;
            if (!password) {
                return false;
            }

            let user = await userRepo.findByEmail(value);
            if (!user) {
                return false;
            }

            let isMatch = await bcryptHelper.check(password, user.password);
            if (!isMatch) {
                return false;
            }

            return true;
        },

        getErrorMessage () {
            return 'Tài khoản không tồn tại';
        }
    }
}

async function loginRequest (req, res, next) {
    let validator = await validate(req.body, {
        email: {
            rules: ['required', 'email', accountMustExisted],
            messages: {
                required: 'Địa chỉ email không được để trống',
                email: 'Email không đúng định dạng'
            }
        },
        password: {
            rules: 'required',
            messages: {
                required: 'Mật khẩu không được để trống'
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

module.exports = loginRequest;
