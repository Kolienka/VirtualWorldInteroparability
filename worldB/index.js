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

const PORT = config.worldB.port;

const { io } = require("socket.io-client");
const supervisorSocket = io("ws://localhost:" + config.supervisor.port);

const players = {}
let nextPlayer = {
  x:0,
  y:0,
  color: 'red'
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/client.html');
});

serverIo.on('connection', function(socket){
  console.log('a new player is connected');

  players[socket.id] = nextPlayer;

  socket.on('move', (dx,dy) => { 
    players[socket.id].x += dx;
    players[socket.id].y += dy;
  });
  
  socket.on('disconnect',function(){
    console.log('a user is disconnected');
    delete players[socket.id];
  })
});

supervisorSocket.on('transferPlayer', function(player){
  credentials = JSON.parse(fs.readFileSync('../credentials.json'));
  console.log(player);
  nextPlayer = credentials[player];
  nextPlayer.x = 0;
  nextPlayer.y = 0;
  console.log(nextPlayer);
})

supervisorSocket.on('identifyWorld', () => {
  supervisorSocket.emit('identifyWorld', config.worldB.id);
});

function update(){
  serverIo.volatile.emit('players', Object.values(players));
}

setInterval(update,1000/60);

server.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});       