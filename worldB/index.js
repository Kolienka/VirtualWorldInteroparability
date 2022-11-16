const express = require('express');
const path = require('node:path');
const app = express();
app.use(express.static(path.join(__dirname,'client/')));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const serverIo = new Server(server);

const { io } = require("socket.io-client");
io("ws://localhost:3002");

const players = {}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/client.html');
});

serverIo.on('connection', function(socket){
  console.log('a new player is connected');

  players[socket.id] = [0,0];

  socket.on('move', (dx,dy) => { 
    players[socket.id][0] += dx;
    players[socket.id][1] += dy;
    console.log(players[socket.id]);
  });
  
  socket.on('disconnect',function(){
    console.log('a user is disconnected');
    delete players[socket.id];
  })
});

function update(){
  serverIo.volatile.emit('players', Object.values(players));
}

setInterval(update,1000/60);

server.listen(3001, () => {
  console.log('listening on *:3001');
});       