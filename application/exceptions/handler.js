'use strict';

let ExceptionNotification = require('@application/notifications/ExceptionNotification');

let shoundNotify = function (err) {
    return [500].indexOf(err.status) > -1;
}

module.exports = (err, req, res, next) => {
    console.error(err);
    let app = req.app;

    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    if (shoundNotify(err)) {
        let notification = new ExceptionNotification(err);
        notification.send();
    }

    return res.abort(err.status);
}
