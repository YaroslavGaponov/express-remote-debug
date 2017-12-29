/*
 * app: express-remote-debug
 * author: Yaroslav Gaponov <yaroslav.gaponov@gmail.com> (c) 2017
*/

'use strict';

const util = require('util');
const dgram = require('dgram');

const DEFAULT_OPTIONS = ['method', 'path', 'query'];

const BROADCAST_TYPE    = 'udp4';
const BROADCAST_ADDR    = '255.255.255.255';

module.exports = function(options) {
    const opt = options || DEFAULT_OPTIONS;

    const socket = dgram.createSocket(BROADCAST_TYPE);
    socket.bind(() => {
        socket.setBroadcast(true);
    });

    return function(req, res, next) {
        const address = req.socket.address();
        const log = [];
        for (let i = 0; i < opt.length; i++) {
            const name = opt[i];
            if (name in req) {
                const value = util.isObject(req[name]) ? JSON.stringify(req[name]) : req[name];
                log.push(util.format('%s: %s', name, value));
            }
        }
        socket.send(util.format('%s\t%s\n', new Date(), log.join(', ')), address.port, BROADCAST_ADDR);
        next();
    };
};