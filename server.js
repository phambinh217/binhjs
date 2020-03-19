#!/usr/bin/env node
require('module-alias/register');

const debug = require('debug')('framework:server');
const framework = require('@/cores/framework');
const app = require('@/bootstrap/app');
const schedule = require('@/app/schedule');
const server = framework.createHttpServer(app);

const io = require('socket.io')(server);
app.set('io', io);

const event = require('@/routes/events');
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
