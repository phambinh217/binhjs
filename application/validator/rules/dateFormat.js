'use strict';

let moment = require('moment');

module.exports = function (field, value, dateFormat) {
    return {
        isPass () {
            return moment(value, dateFormat).format(dateFormat) === value
        },

        getErrorMessage () {
            return `${field} không đúng định dạng`;
        }
    }
}
