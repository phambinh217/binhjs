'use strict';
require('dotenv').config();

module.exports = {
    accesstrade: {
        pubId: process.env.ACCESSTRADE_PUB_ID,
        utmSource: process.env.ACCESSTRADE_UTM_SOURCE,
        utmMedium: process.env.ACCESSTRADE_UTM_MEDIUM,
        utmCampaign: process.env.ACCESSTRADE_UTM_CAMPAIGN,
        utmContent: process.env.ACCESSTRADE_UTM_CONTENT,
    }
}
