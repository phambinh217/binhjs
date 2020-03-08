'use strict';

module.exports = function (field, value) {
    return {
        isPass () {
            return String(value).length > 0;
        },

        getErrorMessage () {
            return `${field} là trường bắt buộc`;
        }
    }
}
