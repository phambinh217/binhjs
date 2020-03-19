'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcrypt = function (string) {
    return bcrypt.hash(string, saltRounds);
}

const check = function (plainText, encodedString) {
    return bcrypt.compare(plainText, encodedString);
}

module.exports = {
    bcrypt,
    check,
}
