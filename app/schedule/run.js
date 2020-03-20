'use strict';

const dailyJob = require('./jobs/dailyJob');
const everyMinute = require('./jobs/everyMinute');

let jobs = [
    dailyJob,
    everyMinute,
];

const run = function (mode = 'normal') {
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

module.exports = run;
