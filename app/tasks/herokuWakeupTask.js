'use strict';

const axios = require('axios');
const appConfig = require('@/config/app');
const { appUrl } = require('@/app/helpers/url');
const { sendNotification } = require('@/cores/notification');

function runHerokuWakeupTask () {
    // sendNotification('Run task: herokuWakeupTask');

    if (appConfig.env == 'production') {
        let weekUpUrl = appUrl('week-up');
        axios.get(weekUpUrl);
    }
}

module.exports = runHerokuWakeupTask;
