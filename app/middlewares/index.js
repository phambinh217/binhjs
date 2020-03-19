'use strict';

const standardizePageQuey = require('./standardizePageQuey');
const viewGlobalVariables = require('./viewGlobalVariables');
const url = require('./url');
const abortion = require('./abortion');

let globalMiddilewares = [
    url,
    abortion,
    standardizePageQuey,
]

module.exports = {
    web: [
        globalMiddilewares,
        viewGlobalVariables
    ],

    api: [
        globalMiddilewares,
    ]
}
