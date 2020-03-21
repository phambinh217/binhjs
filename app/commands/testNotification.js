#!/usr/bin/env node

'use strict';

require('module-alias/register');

const { sendNotification } = require('@/cores/notification');

function main () {
    sendNotification('Hello World! BinhJS');
    console.log('done');
}

main();
