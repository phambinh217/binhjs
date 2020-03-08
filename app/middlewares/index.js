'use strict';

let standardizePageQuey = require('./standardizePageQuey');
let viewGlobalVariables = require('./viewGlobalVariables');
let url = require('./url');
let abortion = require('./abortion');

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
