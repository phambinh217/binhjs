'use strict';

let bcrypt = require('bcrypt');
let saltRounds = 10;

module.exports = {
    bcrypt (string) {
        return bcrypt.hash(string, saltRounds);
    },

    check (plainText, encodedString) {
        return bcrypt.compare(plainText, encodedString);
    }
}
