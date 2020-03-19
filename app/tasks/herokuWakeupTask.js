'use strict';

const axios = require('axios');
const urlHelper = require('@/app/helpers/url');
const TextNotification = require('@/app/notifications/TextNotification');
const appConfig = require('@/config/app');

module.exports = function () {
    // let notification = new TextNotification('Run herokuWakeupTask: I still alive');
    // notification.send();

    if (appConfig.env == 'production') {
        let weekUpUrl = urlHelper.appUrl('week-up');
        axios.get(weekUpUrl);
    }
}
