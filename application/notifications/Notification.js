'use strict';

let axios = require('axios');
let slackConfig = require('@application/config/service').slack;

class Notification {
    constructor () {
        //
    }

    get slackWebHookUrl () {
        return slackConfig.webhookUrl;
    }

    send () {
        let options = this.slackMessage;
        return axios.post(this.slackWebHookUrl, JSON.stringify(options));
    }
}

module.exports = Notification;
