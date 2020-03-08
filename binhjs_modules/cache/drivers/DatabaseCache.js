'use strict';

let cacheModel = require('./cacheModel');
let CacheDriver = require('./CacheDriver');
let md5 = require('md5');

class DatabaseCache extends CacheDriver {
    setItem (key, value, timeout) {
        let expiredAt = undefined;
        if (timeout) {
            let now = new Date();
            expiredAt = now.setSeconds(now.getSeconds() + timeout);
        }

        this.createCache({
            key: md5(key),
            value: value,
            expiredAt: expiredAt,
        });
    }

    async getItem (key, defaultValue = null) {
        let cacheData = await cacheModel.findOne({ key: md5(key) });
        if (!cacheData) {
            return defaultValue;
        }

        return cacheData.value;
    }

    remove (key) {
        cacheModel.deleteOne({ key: md5(key) });
    }

    async createCache (cacheData) {
        let result = await cacheModel.findOne({ key: cacheData.key });
        if (!result) {
            cacheModel.create(cacheData);
        } else {
            for (let k in cacheData) {
                result[k] = cacheData[k];
            }
            result.save();
        }
    }
}

module.exports = DatabaseCache;