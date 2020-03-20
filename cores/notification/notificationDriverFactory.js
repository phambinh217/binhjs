'use strict';

const SlackDriver = require('./drivers/SlackDriver');

const notificationDriverFactory = function (driver, notification) {
    if (driver == 'slack') {
        return new SlackDriver(notification);
    }
}

module.exports = notificationDriverFactory;
