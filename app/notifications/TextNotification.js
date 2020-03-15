'use strict';

let Notification = require('@/cores/notification/Notification');

class TextNotification extends Notification {
    constructor (message) {
        super();
        this.message = message;
    }

    get via () {
        return ['slack'];
    }

    get slackMessage () {
        let message = this.message;
        return {
            text: message
        }
    }
}

module.exports = TextNotification;
