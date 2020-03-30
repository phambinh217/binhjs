'use strict';

function standardFormatBanner (banner) {
    return {
        image: banner.image,
        url: banner.url,
        location: banner.location
    }
}

module.exports = {
    standardFormatBanner
};
