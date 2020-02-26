#!/usr/bin/env node
'use strict';

require('module-alias/register');

let dailyJob = require('@application/schedule/jobs/dailyJob');
let everyMinute = require('@application/schedule/jobs/everyMinute');
let mongoose = require('mongoose');
let databaseConfig = require('@application/config/database');
mongoose.connect(databaseConfig.connectionString, databaseConfig.mongooseOptions);
let run = require('@application/schedule/run');

let main = function () {
    run('test');
    console.log('Done');
}

main();
