'use strict';

require('dotenv').config();

let deviceConfig = require('@/config/device');

module.exports = {
    isMobile (opts) {
        let mobileDebug = process.env.MOBILE_DEBUG == 'true';

        if (mobileDebug && mobileDebug == true) {
            return true;
        }

        let mobileRE = deviceConfig.mobileRE;
        let tabletRE = deviceConfig.tabletRE;

        opts = opts || {};
        let ua = opts.ua;

        if (typeof ua !== 'string') {
            return false
        }

        return opts.tablet ? tabletRE.test(ua) : mobileRE.test(ua);
    }
}
