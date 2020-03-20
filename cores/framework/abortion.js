'use strict';

const abortion = function (req, res, next) {
    res.error404 = function (customViewPath) {
        let viewEngine = req.app.get('view engine');
        let viewPath = req.app.get('views');
        res.status(404);

        if (customViewPath) {
            return res.render(customViewPath);
        }

        return res.render('errors/404');
    }

    next();
}

module.exports = abortion
