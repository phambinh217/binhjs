'use strict';

const standardizePageQuey = require('./standardizePageQuey');

let globalMiddilewares = [
    standardizePageQuey,
];

const middilewares = {
    web: [
        globalMiddilewares,
    ],

    api: [
        globalMiddilewares,
    ]
}

module.exports = middilewares;
