'use strict';

require('@/bootstrap/dbConnection');

const framework = require('@/cores/framework');
const path = require('path');
const apiRouter = require('@/routes/api');
const webRouter = require('@/routes/web');

let options = {
    basePath: path.join(__dirname),
    publicPath: path.join(__dirname, '../public'),
    viewPath: path.join(__dirname, '../resources/views'),
    viewEngine: 'ejs',
}

let app = framework.createApplication(options);

app.use('/', webRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    return res.render('errors/404');
});

// error handler
app.use(function(err, req, res, next) {
    let status = err.status || 500;
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(status);

    res.render('errors/error');
});

module.exports = app;
