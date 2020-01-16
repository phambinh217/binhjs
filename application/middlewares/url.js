'use strict';

require('dotenv').config();

module.exports = function (req, res, next) {
    res.locals.baseUrl = res.locals.baseUrl || process.env.APP_URL || `${req.protocol}://${req.hostname}`;
    res.locals.currentUrl = res.locals.currentUrl || (!req.url || req.url == '/' ? res.locals.baseUrl : `${res.locals.baseUrl}/${req.url}`);

    next();
}
