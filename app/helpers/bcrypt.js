'use strict';

const bcryptLib = require('bcrypt');
const saltRounds = 10;

const bcrypt = function (string) {
    return bcryptLib.hash(string, saltRounds);
}

const check = function (plainText, encodedString) {
    return bcryptLib.compare(plainText, encodedString);
}

module.exports = {
    bcrypt,
    check,
}
