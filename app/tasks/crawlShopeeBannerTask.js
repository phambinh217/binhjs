'use strict';

const shopeeBannerCrawler = require('@/app/crawlers/shopee/shopeeBannerCrawler');
const bannerRepo = require('@/app/repos/bannerRepo');
const { sendNotification } = require('@/cores/notification');

async function runCrawlShopeeBannerTask () {
    sendNotification('Run: runCrawlShopeeBannerTask');
    console.log('Run: runCrawlShopeeBannerTask');

    let bannersResponse;

    try {
        let { data: response } = await shopeeBannerCrawler({
            'types': [
                { 'type': 'activity' }
            ]
        });
        bannersResponse = response;
    } catch (error) {
        sendNotification('Failed: runCrawlShopeeBannerTask');
        return;
    }

    await bannerRepo.deleteAll();

    for (let location in bannersResponse.banners) {
        let banners = bannersResponse.banners[location].banners;
        for (let banner of banners) {
            console.log(location, banner.banner_image);

            bannerRepo.create({
                image: banner.banner_image,
                url: banner.navigate_params.url,
                location: location
            });
        }
    }
}

module.exports = runCrawlShopeeBannerTask;
