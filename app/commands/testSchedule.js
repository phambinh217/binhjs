#!/usr/bin/env node
'use strict';

require('module-alias/register');
require('@/bootstrap/dbConnection');

let dailyJob = require('@/app/schedule/jobs/dailyJob');
let everyMinute = require('@/app/schedule/jobs/everyMinute');
let run = require('@/app/schedule/run');

let main = function () {
    run('test');
    console.log('Done');
}

main();
