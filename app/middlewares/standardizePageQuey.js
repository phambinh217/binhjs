'use strict';

module.exports = function (req, res, next) {
    if (req.query.hasOwnProperty('page')) {
        let page = Number(req.query.page);
        if (page <= 0) {
            page = 1;
        }

        req.query.page = page;
    }

    next();
}
