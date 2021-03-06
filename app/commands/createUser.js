#!/usr/bin/env node

'use strict';

require('module-alias/register');
require('@/bootstrap/dbConnection');

const { validate } = require('@/cores/validator');
const program = require('commander');
const userRepo = require('@/app/repos/userRepo');
const bcryptHelper = require('@/app/helpers/bcrypt');

function emailUnique (field, email) {
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

async function main () {
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
        return console.error(validator.getFirstErrorMessage());
    }

    let password = await bcryptHelper.bcrypt(program.password);

    userRepo.create({
        email: program.email,
        password: password
    });

    return console.log('Created user successful!');
}

main();
