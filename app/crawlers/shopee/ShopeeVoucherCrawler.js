'use strict';
/*
Lấy mã giảm giá theo shop id
GET https://shopee.vn/api/v2/voucher_wallet/get_shop_vouchers_by_shopid?shopid=34908080&with_claiming_status=false
 */

const ThreadObserver = require('@/app/libraries/axiosThread/ThreadObserver');
const Thread = require('@/app/libraries/axiosThread/Thread');
const crawlShopeeMallGroupByCategory = require('./shopeeMallGroupByCategoryCrawler');
const crawlShopVoucher = require('./shopVoucherCrawler');

class ShopeeVoucherCrawler {
    constructor (options) {
        options = options || {};
        this._categories = [];
        this.numberOfThread = options.numberOfThread || 10;
        this.done = options.done || function () {};
        this.doneCrawlCategory = options.doneCategory || function () {};
        this.startCrawlCategory = options.startCrawlCategory || function () {};
        this.eachVoucher = options.eachVoucher || function () {};
        this.doneCategory = options.doneCategory || function () {};
        this.currentCategoryIndex = 0;
        this.threadObserver = new ThreadObserver();
    }

    async getCategories () {
        if (this._categories.length == 0) {
            this._categories = await crawlShopeeMallGroupByCategory();
        }

        return this._categories;
    }

    async run () {
        let categories = await this.getCategories();
        let category = categories[this.currentCategoryIndex];
        if (!category) {
            return this.done();
        }

        this.startCrawlCategory(category);

        for (let shop of category.shops) {
            let request = crawlShopVoucher(shop.shopid);
            this.threadObserver.push(new Thread(request));

            request.then(({ data: response }) => {
                response.data.voucher_list.forEach(voucherItem => {
                    this.eachVoucher(voucherItem, shop, category);
                });
            })
            .finally(e => this.threadObserver.ifDone(threads => {
                this.doneCategory(category);
                this.currentCategoryIndex++;
                this.run();
            }));
        }
    }
}

module.exports = ShopeeVoucherCrawler;
