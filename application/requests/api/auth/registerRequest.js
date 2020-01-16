'use strict';

let { validate } = require('@application/validator');
let userRepo = require('@application/repos/userRepo');

module.exports = async function (req, res, next) {
    let validator = await validate(req.body, {
        email: {
            rules: ['required', 'email', function (field, email) {
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
            }],
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
