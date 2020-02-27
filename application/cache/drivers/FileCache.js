'use strict';

let fs = require('fs');
let md5 = require('md5');
let CacheDriver = require('./CacheDriver')

class FileCache extends CacheDriver {
    setItem (key, data, timeout) {
        let keyInfo = this.getKeyinfo(key);
        let expiredAt = undefined;

        if (timeout) {
            let now = new Date();
            expiredAt = now.setSeconds(now.getSeconds() + timeout);
        }

        if (!fs.existsSync(keyInfo.cacheDirpath)) {
            fs.mkdirSync(keyInfo.cacheDirpath);
        }

        this.createCache(keyInfo.cacheFilepath, {
            data: JSON.stringify(data),
            expiredAt: expiredAt
        });
    }

    getItem (key, defaultValue = null) {
        let keyInfo = this.getKeyinfo(key);

        if (!fs.existsSync(keyInfo.cacheFilepath)) {
            return defaultValue;
        }
        
        let cacheContent;
        try {
            cacheContent = JSON.parse(fs.readFileSync(keyInfo.cacheFilepath));
        } catch (error) {
            return defaultValue;
        }

        if (cacheContent.expiredAt == undefined) {
            return JSON.parse(cacheContent.data);
        }

        let now = new Date();
        let expiredAt = new Date(cacheContent.expiredAt);

        if (now.getTime() <= expiredAt.getTime()) {
            return JSON.parse(cacheContent.data);
        }

        return defaultValue;
    }

    createCache (cacheFilepath, cacheData) {
        fs.writeFileSync(cacheFilepath, JSON.stringify(cacheData));
    }

    remove (key) {
        let keyInfo = this.getKeyinfo(key);
        unlink.unlink(keyInfo.cacheFilepath);
    }

    getKeyinfo (key) {
        let encodedKey = md5(key);
        let dirname = encodedKey.slice(0, 3);
        let cacheDirpath = `./storage/cache/${dirname}`;
        let cacheFilepath = cacheDirpath + '/' + encodedKey;

        return {
            key: key,
            encodedKey: encodedKey,
            dirname: dirname,
            cacheDirpath: cacheDirpath,
            cacheFilepath: cacheFilepath,
        } 
    }
}

module.exports = FileCache;
