'use strict';

let axios = require('axios');

class Notification {
    constructor () {
        //
    }

    get slackWebHookUrl () {
        return 'https://hooks.slack.com/services/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';
    }

    send () {
        let options = this.slackMessage;
        return axios.post(this.slackWebHookUrl, JSON.stringify(options));
    }
}

module.exports = Notification;
