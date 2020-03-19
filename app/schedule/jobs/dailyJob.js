'use strict';

const cron = require('cron');
const TextNotification = require('@/app/notifications/TextNotification');
const appConfig = require('@/config/app');

let dailyJob = new cron.CronJob({
    cronTime: '0 0 * * *',
    onTick () {

    },
    start: true,
    timeZone: appConfig.timezone,
});

module.exports = dailyJob;
