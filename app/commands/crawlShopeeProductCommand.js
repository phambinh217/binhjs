#!/usr/bin/env node

'use strict';

require('module-alias/register');
require('@/bootstrap/dbConnection');

const crawlShopeeProductTask = require('@/app/tasks/crawlShopeeProductTask');

crawlShopeeProductTask();
