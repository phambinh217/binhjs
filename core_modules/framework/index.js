'use strict';

let express = require('express');
let Application = require('./Application');
let Server = require('./Server');

module.exports = {
    createApplication (options) {
        return Application.init(options).getExpressApp();
    },

    createHttpServer (options) {
        return Server.init(options).getHttpServer();
    },

    createRouter () {
        return express.Router();
    },
}
