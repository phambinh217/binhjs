'use strict';

var http = require('http');

class Server {
    constructor (app) {
        this.app = app;
        this.httpServer = http.createServer(this.app);
    }

    static init (options) {
        if (Server.self == undefined) {
            Server.self = new Server(options);
        }

        return Server.self;
    }

    getHttpServer () {
        return this.httpServer;
    }
}

module.exports = Server;
