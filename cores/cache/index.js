'use strict';

let FileCacheDriver = require('./drivers/FileCache');
let cacheConfig = require('@/config/cache');

class CacheFactory {
    constructor (driver) {
        driver = driver || cacheConfig.driver;
        if (CacheFactory.instance) {
            return CacheFactory.instance;
        }

        if (driver == 'file') {
            CacheFactory.instance = new FileCacheDriver();
        } else if (driver == 'redis') {
            // Not not support redis
        }

        return CacheFactory.instance;
    }
}

module.exports = function (driver) {
    return new CacheFactory(driver);
};
