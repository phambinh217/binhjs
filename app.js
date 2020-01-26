'use strict';

let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('morgan');
let cors = require('cors');
let mongoose = require('mongoose');
let databaseConfig = require('./application/config/database');
let webRouter = require('./application/routes/web');
let apiRouter = require('./application/routes/api');
let exceptionHandler = require('./application/exceptions/handler');
let corsOptions = require('./application/config/cors');
let app = express();

mongoose.connect(databaseConfig.connectionString, databaseConfig.mongooseOptions);

app.use(cors(corsOptions));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use('/', webRouter);
app.use('/api', apiRouter);
app.use((req, res, next) => next(createError(404)));
app.use(exceptionHandler);

module.exports = app;
