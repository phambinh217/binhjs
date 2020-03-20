'use strict';

const notificationConfig = require('@/config/notification');;
const Notification = require('../Notification');;
const slackConfig = require('@/config/service').slack;

class SimpleTextNotification extends Notification {
    constructor (message) {
        super();

        this.message = message;
    }

    get slackWebHookUrl () {
        return slackConfig.webhookUrl;
    }

    get slackMessage () {
        let message = this.message;
        return {
            text: message
        }
    }

    get via () {
        return notificationConfig.simpleTextNotification.via;
    }
}

module.exports = SimpleTextNotification;
