'use strict';

let cron = require('cron');
let TextNotification = require('@/app/notifications/TextNotification');
let appConfig = require('@/config/app');

let dailyJob = new cron.CronJob({
    cronTime: '0 0 * * *',
    onTick () {

    },
    start: true,
    timeZone: appConfig.timezone,
});

module.exports = dailyJob;