'use strict';

let cron = require('cron');
let TextNotification = require('@application/notifications/TextNotification');
let appConfig = require('@application/config/app');

let dailyJob = new cron.CronJob({
    cronTime: '0 0 * * *',
    onTick () {

    },
    start: true,
    timeZone: appConfig.timezone,
});

module.exports = dailyJob;