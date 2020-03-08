'use strict';
require('dotenv').config();

module.exports = {
    slack: {
        webhookUrl: process.env.SLACK_WEBHOOK
    }
}
