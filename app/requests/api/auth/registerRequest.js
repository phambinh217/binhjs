'use strict';

const { validate } = require('@/cores/validator');
const userRepo = require('@/app/repos/userRepo');

function uniqueEmail(field, email) {
    return {
        getRuleName () {
            return 'uniqueEmail';
        },
        async isPass () {
            let user = await userRepo.findByEmail(email);
            if (user) {
                return false;
            }
            return true;
        }
    }
}

async function registerRequest (req, res, next) {
    let validator = await validate(req.body, {
        email: {
            rules: ['required', 'email', uniqueEmail],
            messages: {
                required: 'Địa chỉ email không được để trống',
                email: 'Địa chỉ email không đúng định dạng',
                uniqueEmail: 'Địa chỉ email đã tồn tại'
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

module.exports = registerRequest;
