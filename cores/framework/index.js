'use strict';

let express = require('express');
let Application = require('./Application');
let Server = require('./Server');

exports.createApplication = function (options) {
    return Application.init(options).getExpressApp();
}

exports.createHttpServer = function (options) {
    return Server.init(options).getHttpServer();
}

exports.createRouter = function () {
    return express.Router();
}
