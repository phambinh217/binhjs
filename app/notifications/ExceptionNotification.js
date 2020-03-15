'use strict';

let Notification = require('@/cores/notification/Notification');

class ExceptionNotification extends Notification {
    constructor (error) {
        super();
        this.error = error;
    }

    get via () {
        return ['slack'];
    }

    get slackMessage () {
        let error = this.error;
        return {
            text: "Error"
        }
    }
}

module.exports = ExceptionNotification;
