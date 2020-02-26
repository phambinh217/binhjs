'use strict';

let dailyJob = require('./jobs/dailyJob');
let everyMinute = require('./jobs/everyMinute');

let jobs = [
    dailyJob,
    everyMinute,
]

module.exports = function (mode = 'normal') {
    if (mode == 'normal') {
        for (let job of jobs) {
            job.start();
        }
    } else if (mode == 'test') {
        for (let job of jobs) {
            job.fireOnTick();
        }
    }
}
