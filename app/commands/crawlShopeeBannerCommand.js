#!/usr/bin/env node

'use strict';

require('module-alias/register');
require('@/bootstrap/dbConnection');

const runCrawlShopeeBannerTask = require('@/app/tasks/crawlShopeeBannerTask');

runCrawlShopeeBannerTask();
