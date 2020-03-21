'use strict';

const crawlSingleProduct = require('./singleProductCrawler');
const crawlProductsAtPage = require('./productsAtPageCrawler');
const ThreadObserver = require('@/app/libraries/axiosThread/ThreadObserver');
const Thread = require('@/app/libraries/axiosThread/Thread');

class ShopeeProductCrawler {
    constructor (options) {
        this.threadObserver = new ThreadObserver();
        this.currentPage = 1;
        this.options = options;
        this.limitPage = this.options.limitPage || 10;
        this.done = this.options.done || function () {};
        this.eachProduct = this.options.eachProduct || function () {};
        this.doneAtPage = this.options.doneAtPage || function () {};
        this.startAtPage = this.options.startAtPage || function () {};
        this.isSkipProduct = this.options.isSkipProduct || function () { return false };
        this.queryPrams = {
            keyword: this.options.keyword,
            limit: this.options.limit || 50,
            by: this.options.by || 'sales'
        };
    }

    run () {
        if (this.currentPage > this.limitPage) {
            this.done();
            return;
        }

        this.startAtPage(this.currentPage);

        crawlProductsAtPage(this.queryPrams, this.currentPage)
        .then(({ data: response }) => {
            response.items.forEach(product =>  {
                if (this.isSkipProduct(product) == false) {
                    let request = crawlSingleProduct(product.itemid, product.shopid);
                    let thread = new Thread(request);
                    this.threadObserver.push(thread);

                    request.then(({ data: response }) => {
                        this.eachProduct(response.item);
                    })
                    .finally(e => this.threadObserver.ifDone(threads => {
                        this.doneAtPage(this.currentPage, threads);
                        this.currentPage++;
                        this.run();
                    }));
                }
            });
        });
    }
}

module.exports = ShopeeProductCrawler;
