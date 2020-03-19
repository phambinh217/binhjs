'use strict';

const cron = require('cron');
const herokuWakeupTask = require('@/app/tasks/herokuWakeupTask');
const TextNotification = require('@/app/notifications/TextNotification');
const appConfig = require('@/config/app');

let dailyJob = new cron.CronJob({
    cronTime: '* * * * *',
    onTick () {
        // let notification = new TextNotification('Run everyMinute crontab');
        // notification.send();
        herokuWakeupTask();
    },
    start: true,
    timeZone: appConfig.timezone,
});

module.exports = dailyJob;
