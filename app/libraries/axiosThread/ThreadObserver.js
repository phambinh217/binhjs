'use trict';

class ThreadObserver {
    constructor () {
        this.threads = []
    }

    push (thread) {
        this.threads.push(thread);
    }

    isDone () {
        return this.threads.every(thread => {
            return thread.isDone();
        });
    }

    ifDone (handle) {
        if (!this.isDone()) {
            return ;
        }

        return handle(this.threads);
    }

    flush () {
        this.threads = [];
    }
}

module.exports = ThreadObserver;
