'use strict';

const SimpleTextNotification = require('./notifications/SimpleTextNotification');
const notificationDriverFactory = require('./notificationDriverFactory');

const sendNotification = function (message) {
    if (typeof message == 'string') {
        message = new SimpleTextNotification(message);
    }

    for (let driver of message.via) {
        let mailman = notificationDriverFactory(driver, message);
        mailman.send();
    }
}

module.exports = sendNotification;
