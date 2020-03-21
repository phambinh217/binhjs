'use strict';

const express = require('express');
const Application = require('./Application');
const Server = require('./Server');

function createApplication (options) {
    return Application.init(options).getExpressApp();
}

function createHttpServer (options) {
    return Server.init(options).getHttpServer();
}

function createRouter () {
    return express.Router();
}

module.exports = {
    createApplication,
    createHttpServer,
    createRouter,
}
