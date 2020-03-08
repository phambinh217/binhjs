'use strict';

module.exports = {
    arrRandom (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    arrChunk (array, chunkSize) {
        return [].concat.apply([], array.map(function (elem, i) {
            return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        }));
    }
}
