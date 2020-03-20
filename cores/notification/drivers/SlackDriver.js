'use strict';

const axios = require('axios');

class SlackDriver {
    constructor (notification) {
        this.notification = notification;
    }

    send () {
        let slackMessage = this.notification.slackMessage;
        let slackWebHookUrl = this.notification.slackWebHookUrl;

        return axios.post(slackWebHookUrl, JSON.stringify(slackMessage));
    }
}

module.exports = SlackDriver;
