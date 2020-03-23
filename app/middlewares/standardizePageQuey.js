'use strict';

function standardizePageQuey (req, res, next) {
    if (req.query.hasOwnProperty('page')) {
        let page = Number(req.query.page);
        if (page <= 0) {
            page = 1;
        }

        req.query.page = page;
    }

    if (req.query.hasOwnProperty('perpage')) {
        let perpage = Number(req.query.perpage);
        if (perpage <= 0) {
            perpage = 1;
        }

        req.query.perpage = perpage;
    }

    next();
}

module.exports = standardizePageQuey;
