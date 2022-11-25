const express = require('express');
const path = require('node:path');
const app = express();
app.use(express.static(path.join(__dirname,'client/')));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const serverIo = new Server(server);
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('../config.json'));
let credentials = JSON.parse(fs.readFileSync('../credentials.json'));

const PORT = config.worldA.port;
const PORTSUPERVISOR = config.supervisor.port;

const { io } = require("socket.io-client");
const supervisorSocket = io("ws://localhost:" + PORTSUPERVISOR);

const players = {}
const colors = ['red', 'green', 'blue'];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/client.html');
});

serverIo.on('connection', function(socket){

  credentials = JSON.parse(fs.readFileSync('../credentials.json'));

  console.log('a new player is connected');

  players[socket.id] = {
    pseudo: 'guest',
    x: 0,
    y: 0,
    color: colors[0]
  };

  socket.on('move', (dx,dy) => { 
    players[socket.id].x += dx;
    players[socket.id].y += dy;
    if(players[socket.id].x == 5 && players[socket.id].y == 5){
      const destination = 'worldB';
      supervisorSocket.emit('dataPlayer', destination, players[socket.id].pseudo);
      supervisorSocket.emit('teleport',destination);
    }
    console.log(players[socket.id]);
  });

  supervisorSocket.on('sendAdress', function(port){
    socket.emit('teleport', port);
  });

  socket.on('disconnect',function(){
    console.log('a user is disconnected');
    saveCredentials(socket,players[socket.id].pseudo);
    delete players[socket.id];
  });

  socket.on('changeColor', () => {
    console.log(players[socket.id]);
    changeColor(players[socket.id]);
  });

  socket.on('credentialsConnect', function(data){
    console.log('credential connect wtf');
    if(data in credentials){
      players[socket.id].color = credentials[data].color;
      players[socket.id].pseudo = credentials[data].pseudo; 
    }else{
      saveCredentials(socket,data);
    }
  });
});

supervisorSocket.on('identifyWorld', () => {
  supervisorSocket.emit('identifyWorld', config.worldA.id);
});

function changeColor(player){
  if(player.x == 0 && player.y == 5){
    let i = colors.findIndex((color) => color == player.color);
    i = (i+1 < colors.length) ? i+1 : 0;
    player.color = colors[i];
  }
}

function update(){
  serverIo.volatile.emit('players', Object.values(players));
}

function saveCredentials(socket,pseudo){
  credentials[pseudo] = {};
  credentials[pseudo].color = players[socket.id].color;
  credentials[pseudo].pseudo = pseudo;
  fs.writeFileSync('../credentials.json',JSON.stringify(credentials));
}

setInterval(update,1000/60);

server.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});       
