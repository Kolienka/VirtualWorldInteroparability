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
const colors = ['red', 'green', 'blue'];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/client.html');
});

serverIo.on('connection', function(socket){
  console.log('a new player is connected');

  players[socket.id] = {
    x: 0,
    y: 0,
    color: colors[0]
  };

  socket.on('move', (dx,dy) => { 
    players[socket.id].x += dx;
    players[socket.id].y += dy;
    if(players[socket.id].x == 5 && players[socket.id].y == 5){
      console.log("must teleport server side")
      const destination = 'http://localhost:3001';
      socket.emit('teleport',destination);
    }
    console.log(players[socket.id]);
  });
  
  socket.on('disconnect',function(){
    console.log('a user is disconnected');
    delete players[socket.id];
  })

  socket.on('changeColor', () => {
    console.log("test color")
    changeColor(players[socket.id]);
  })

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

setInterval(update,1000/60);

server.listen(3000, () => {
  console.log('listening on *:3000');
});       
