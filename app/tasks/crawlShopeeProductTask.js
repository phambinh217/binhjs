'use strict';

const ShopeeProductCrawler = require('@/app/crawlers/shopee/ShopeeProductCrawler');
const formatProduct = require('@/app/crawlers/shopee/productFormat');
const collections = require('@/config/collections');
const { strSlug } = require('@/app/helpers/str');
const productRepo = require('@/app/repos/productRepo');
const CrawledShopeeProductsNotification = require('@/app/notifications/CrawledShopeeProductsNotification');
const { sendNotification } = require('@/cores/notification');

class CrawlShoopeProductCommand {
    startWithCollection (collection) {
        console.log(`Collection: ${collection.title}`);
    }

    startCollectionPage (page, collection) {
        console.log(`\tStart page: ${page}`);
    }

    skipProduct (product) {
        this.totalSkippedProduct++;
        // console.log(`\t\tSkip product`);
    }

    eachProduct (product, collection) {
        let productData = formatProduct(product, collection);
        let commandSelf = this;
        console.log(`\t\tCreated: ${productData.title}`);

        productRepo.collectFromCrawler(productData, collection, {
            onCreated (createdProduct) {
                commandSelf.totalCreatedProduct++;
                console.log(`\t\tCreated: ${createdProduct.title}`);
            },

            onUpdated (updatedProduct) {
                commandSelf.totalUpdatedProduct++;
                console.log(`\t\tUpdated: ${updatedProduct.title}`);
            },

            onFailed (productData) {
                commandSelf.totalFailedProduct++;
                console.log(`\t\tFailed: ${productData.title}`);
            }
        });
    }

    done () {
        console.table({
            totalSkippedProduct: this.totalSkippedProduct,
            totalUpdatedProduct: this.totalUpdatedProduct,
            totalCreatedProduct: this.totalCreatedProduct,
            totalFailedProduct: this.totalFailedProduct,
        });

        let noti = new CrawledShopeeProductsNotification({
            totalSkippedProduct: this.totalSkippedProduct,
            totalUpdatedProduct: this.totalUpdatedProduct,
            totalCreatedProduct: this.totalCreatedProduct,
            totalFailedProduct: this.totalFailedProduct,
        });

        sendNotification(noti);
    }

    crawlable (product, collection) {
        if (collection.hasOwnProperty('crawl') && collection.crawl.hasOwnProperty('titleIncludes')) {
            return collection.crawl.titleIncludes.every(requireTexts => {
                return requireTexts.some(text => {
                    return strSlug(product.name).replace(/-/ig, ' ').includes(text);
                });
            });
        }

        return true;
    }

    constructor (collections) {
        this.collections = collections;
        this.currentCollectionIndex = 0;
        this.totalSkippedProduct = 0;
        this.totalUpdatedProduct = 0;
        this.totalCreatedProduct = 0;
        this.totalFailedProduct = 0;
    }

    run () {
        let collection = this.collections[this.currentCollectionIndex];
        if (!collection) {
            return this.done();
        }

        if (!('crawl' in collection)) {
            return this.next();
        }

        if (!('shopee' in collection.crawl)) {
            return this.next();
        }

        this.startWithCollection(collection);

        let shopeeCrawlOptions = collection.crawl.shopee;

        let commandSelf = this;

        let crawler = new ShopeeProductCrawler({
            keyword: shopeeCrawlOptions.keyword,
            limit: shopeeCrawlOptions.limit,
            by: shopeeCrawlOptions.by,
            limitPage: shopeeCrawlOptions.limitPage,

            startAtPage (page) {
                commandSelf.startCollectionPage(page, collection);
            },

            isSkipProduct (product) {
                let crawlable = commandSelf.crawlable(product, collection);
                if (crawlable == false) {
                    commandSelf.skipProduct(product);
                }

                return crawlable == false;
            },

            eachProduct (product) {
                commandSelf.eachProduct(product, collection);
            },

            done () {
                commandSelf.next();
            }
        });

        crawler.run();
    }

    next () {
        this.currentCollectionIndex++;
        this.run();
    }
}

function runCrawlShopeeProductTask () {
    let childsCollection = [];
    for (let rootCollection of collections) {
        let childs = rootCollection.childs;
        childs.map(item => item.parentId = rootCollection.id);
        childsCollection = childsCollection.concat(childs);
    }
    let crawl = new CrawlShoopeProductCommand(childsCollection);
    crawl.run();
}

module.exports = runCrawlShopeeProductTask;
