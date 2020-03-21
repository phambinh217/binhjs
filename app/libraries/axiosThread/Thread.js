'use strict';

class Thread {
    constructor (axiosInstance) {
        this.axiosInstance = axiosInstance;
        this.done = false;
        this.axiosInstance.finally(e => {
            this.done = true;
        });
    }

    isDone () {
        return this.done == true;
    }
}

module.exports = Thread;
