'use strict';

const bcryptLib = require('bcrypt');
const saltRounds = 10;

function bcrypt (string) {
    return bcryptLib.hash(string, saltRounds);
}

function check (plainText, encodedString) {
    return bcryptLib.compare(plainText, encodedString);
}

module.exports = {
    bcrypt,
    check,
}
