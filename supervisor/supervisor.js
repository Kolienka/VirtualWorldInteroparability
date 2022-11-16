const express = require('express');
const path = require('node:path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const serverIo = new Server(server);

const { io } = require("socket.io-client");
io("ws://localhost:3003");

serverIo.on('connection', function(socket){
    console.log('a new world is connected: world socket ID: ' + socket.id);
});

server.listen('3002', () => {
    console.log('supervisor is listening on *:3002');
})
