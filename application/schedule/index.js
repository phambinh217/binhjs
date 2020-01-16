'use strict';

let dailyJob = require('./jobs/dailyJob');
let everyMinute = require('./jobs/everyMinute');

module.exports = function (app) {
    dailyJob.start();
    everyMinute.start();
}
