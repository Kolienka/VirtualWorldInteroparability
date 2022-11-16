const express = require('express');
const path = require('node:path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', function(socket){
    console.log('a new supervisor is connected: supervisor socket ID: ' + socket.id);
});

server.listen('3003', () => {
    console.log('universe is listening on *:3003');
})
