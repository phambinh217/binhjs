'use strict';

let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('morgan');
let cors = require('cors');
let corsOptions = require('@/config/cors');
const abortion = require('./abortion');

class Application {
    constructor (options) {
        this.options = options;
        this.createExpressApp();
    }

    static init (options) {
        if (Application.self == undefined) {
            Application.self = new Application(options);
        }
        return Application.self;
    }

    static getInstance () {
        return Application.self;
    }

    createExpressApp () {
        this.expressApp = express();
        this.expressApp.set('views', this.options.viewPath);
        this.expressApp.set('view engine', this.options.viewEngine);
        this.expressApp.use(logger('dev'));
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(express.static(this.options.publicPath));
        this.expressApp.use(cors(corsOptions));
        this.expressApp.use(abortion);
    }

    getExpressApp () {
        return this.expressApp;
    }
}

module.exports = Application;
