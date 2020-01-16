'use strict';

module.exports = function (field, value, sameValue) {
    return {
        isPass () {
            value = String(value);
            if (value.length == 0) {
                return true;
            }

            return value == sameValue;
        },

        getErrorMessage () {
            return `${field} không trùng khớp`;
        }
    }
}
