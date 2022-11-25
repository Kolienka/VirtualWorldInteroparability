const express = require('express');
const path = require('node:path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('../config.json'));

const PORT = config.supervisor.port;

let worlds = [];

io.on('connection', function(socket){
    console.log('a new world is connected: world socket ID: ' + socket.id);

    socket.emit('identifyWorld');

    socket.on('dataPlayer', (destination,player) => {
        console.log('destination socket: ' + worlds[destination]);
        io.to(worlds[destination]).emit('transferPlayer',player);
    })

    socket.on('identifyWorld', (id) => {
        worlds[id] = socket.id;
        console.log(worlds);
    })

    socket.on('teleport', function(destination){
        console.log('destination port : ' + config[destination].port);
        socket.emit('sendAdress', config[destination].port)
    });

    socket.on('disconnect', () => {
        console.log('world with id: ' + socket.id + ' is disconnected');
    })

});

server.listen(PORT, () => {
    console.log('supervisor is listening on *:' + PORT);
})
