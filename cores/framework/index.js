'use strict';

const express = require('express');
const Application = require('./Application');
const Server = require('./Server');

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
