'use strict';

let bcrypt = require('bcrypt');
let saltRounds = 10;

exports.bcrypt = function (string) {
    return bcrypt.hash(string, saltRounds);
}

exports.check = function (plainText, encodedString) {
    return bcrypt.compare(plainText, encodedString);
}
