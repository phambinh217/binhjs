'use strict';

const standardizePageQuey = require('./standardizePageQuey');

let globalMiddilewares = [
    standardizePageQuey,
]

module.exports = {
    web: [
        globalMiddilewares,
    ],

    api: [
        globalMiddilewares,
    ]
}
