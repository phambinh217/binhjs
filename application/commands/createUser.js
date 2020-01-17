'use strict';

require('module-alias/register');

let program = require('commander');
let mongoose = require('mongoose');
let { validate } = require('@application/validator');
let databaseConfig = require('@application/config/database');
let userRepo = require('@application/repos/userRepo');
let bcryptHelper = require('@application/helpers/bcrypt');

mongoose.connect(databaseConfig.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let emailUnique = function (field, email) {
    return {
        getRuleName () {
            return 'emailUnique';
        },

        async isPass () {
            let user = await userRepo.findByEmail(email);
            if (user) {
                return false;
            }

            return true;
        },

        getErrorMessage () {
            return 'Địa chỉ email đã được sử dụng';
        }
    }
}

let main = async function () {
    program
        .option('-e, --email <email>', 'User email')
        .option('-p, --password <password>', 'User password');
    program.parse(process.argv);

    let validator = await validate({
        email: program.email,
        password: program.password,
    }, {
        email: ['required', 'email', emailUnique],
        password: 'required',
    });

    if (validator.isPass() == false) {
        console.error(validator.getFirstErrorMessage());
        return;
    }

    let password = await bcryptHelper.bcrypt(program.password);

    userRepo.create({
        email: program.email,
        password: password
    });

    console.log('Created user successful!');
}

main();
