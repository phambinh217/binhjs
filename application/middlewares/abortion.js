'use strict';

let fs = require('fs');

module.exports = function (req, res, next) {
    res.abort = function (statusCode, customViewPath) {
        let viewEngine = req.app.get('view engine');
        res.status(statusCode);

        if (customViewPath) {
            return res.render(customViewPath);
        } else if (fs.existsSync(`views/errors/${statusCode}.${viewEngine}`)) {
            return res.render(`errors/${statusCode}`);
        }

        return res.render('errors/error');
    }

    next();
}
