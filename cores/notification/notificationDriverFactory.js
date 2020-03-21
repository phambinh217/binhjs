'use strict';

const SlackDriver = require('./drivers/SlackDriver');

function notificationDriverFactory (driver, notification) {
    if (driver == 'slack') {
        return new SlackDriver(notification);
    }
}

module.exports = notificationDriverFactory;
