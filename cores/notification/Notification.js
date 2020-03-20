'use strict';

class Notification {
    constructor () {
        //
    }

    get slackWebHookUrl () {
        return slackConfig.webhookUrl;
    }

    get via () {
        return ['slack'];
    }
}

module.exports = Notification;
