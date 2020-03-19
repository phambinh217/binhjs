'use strict';

let express = require('express');
let Application = require('./Application');
let Server = require('./Server');

const createApplication = function (options) {
    return Application.init(options).getExpressApp();
}

const createHttpServer = function (options) {
    return Server.init(options).getHttpServer();
}

const createRouter = function () {
    return express.Router();
}

module.exports = {
    createApplication,
    createHttpServer,
    createRouter,
}
