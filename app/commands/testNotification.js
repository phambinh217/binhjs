'use strict';
require('module-alias/register');

const { sendNotification } = require('@/cores/notification');

const main = function () {
    sendNotification('Hello World! BinhJS');
    console.log('done');
}

main();
