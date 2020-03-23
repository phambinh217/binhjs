'use strict';

const bannerRepo = require('@/app/repos/bannerRepo');
const { standardFormatBanner } = require('@/app/format/bannerFormat');

async function getAllBanners (req, res) {
    let banners = (await bannerRepo.all()).map(standardFormatBanner);

    let groupedBanners = {};
    for (let banner of banners) {
        if (groupedBanners[banner.location] == undefined) {
            groupedBanners[banner.location] = [];
        }
        groupedBanners[banner.location].push(banner);
    }

    return res.json({
        status: 'success',
        data: groupedBanners,
    });
}

module.exports = {
    getAllBanners,
}
