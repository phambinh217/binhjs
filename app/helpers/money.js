'use strict';

function moneyFormat (inputNumber, format) {
    let number = Number(inputNumber);
    let formatedPriceWithComma = (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/\.00/g, '');
    if (!format) {
        format = '{{ price }}đ';
    }

    return format.replace(/{{ price }}/g, formatedPriceWithComma);
}

module.exports = {
    moneyFormat,
}
