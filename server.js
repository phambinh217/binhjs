#!/usr/bin/env node
require('module-alias/register');

let debug = require('debug')('framework:server');
let framework = require('@/core_modules/framework');
let app = require('@/bootstrap/app');
let schedule = require('@/app/schedule');
let server = framework.createHttpServer(app);

let io = require('socket.io')(server);
app.set('io', io);

let event = require('@/routes/events');
app.set('event', event);

schedule(app);

let port = process.env.PORT || '3000';
server.listen(port);

server.on('error', function (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;
    }
});

server.on('listening', function () {
    let addr = server.address();
    let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
});
