'use strict';

let cron = require('cron');
let herokuWakeupTask = require('@application/tasks/herokuWakeupTask');
let TextNotification = require('@application/notifications/TextNotification');
let appConfig = require('@application/config/app');

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