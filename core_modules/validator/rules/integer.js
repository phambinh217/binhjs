'use strict';

module.exports = function (field, value) {
    return {
        isPass () {
            if (value === undefined) {
                return false;
            }
            if (value === null) {
                return false;
            }
            if (typeof value == 'string') {
                value = value.trim();
                if (value === '') {
                    return false;
                }
            }

            return Number.isInteger(Number(value));
        },

        getErrorMessage () {
            return `${field} phải là số nguyên`;
        }
    }
}
