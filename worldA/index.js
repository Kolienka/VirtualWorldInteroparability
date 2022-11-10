const express = require('express');
const path = require('node:path');
const app = express();
app.use(express.static(path.join(__dirname,'client/')));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const players = {}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/client.html');
});

io.on('connection', (socket) => {
  console.log('a new player is connected');

  players[socket.id] = [0,0];

  socket.on('move', (dx,dy,cellSize) => {
    players[socket.id][0] += dx*cellSize;
    players[socket.id][1] += dy*cellSize;
  });
  socket.on('disconnect',function(){
    console.log('a user is disconnected');
    delete players[socket.id];
  })
});

function update(){
  io.volatile.emit('players', Object.values(players));
}

setInterval(update,1000/60);

server.listen(3000, () => {
  console.log('listening on *:3000');
});