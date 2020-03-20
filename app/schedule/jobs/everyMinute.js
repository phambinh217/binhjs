'use strict';

const cron = require('cron');
const herokuWakeupTask = require('@/app/tasks/herokuWakeupTask');
const appConfig = require('@/config/app');

let dailyJob = new cron.CronJob({
    cronTime: '* * * * *',
    onTick () {
        herokuWakeupTask();
    },
    start: true,
    timeZone: appConfig.timezone,
});

module.exports = dailyJob;
