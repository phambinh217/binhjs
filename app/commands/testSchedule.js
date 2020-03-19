#!/usr/bin/env node
'use strict';

require('module-alias/register');
require('@/bootstrap/dbConnection');

const dailyJob = require('@/app/schedule/jobs/dailyJob');
const everyMinute = require('@/app/schedule/jobs/everyMinute');
const run = require('@/app/schedule/run');

const main = function () {
    run('test');
    console.log('Done');
}

main();
