'use strict';

require('dotenv').config();

let axios = require('axios');
let urlHelper = require('../helpers/url');
let TextNotification = require('../notifications/TextNotification');

module.exports = function () {
    // let notification = new TextNotification('Run herokuWakeupTask: I still alive');
    // notification.send();

    if (process.env.NODE_ENV == 'production') {
        let weekUpUrl = urlHelper.appUrl('week-up');
        axios.get(weekUpUrl);
    }
}
