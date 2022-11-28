import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("ws://localhost:3000");

let players = [];

const credentialsSender = document.getElementById('credentialsSender')

console.log(credentialsSender);

const map = { //define a maxX*maxY grid map

    cellSize : 70,

    minX : 0,
    maxX : 6,
    minY : 0,
    maxY : 6
}

function initGame(){

    drawGrid(map.maxX,map.maxY, map.cellSize);
    drawPlayers([0,0],map.cellSize);

    new KeyPressListener('ArrowLeft', () => handleArrowPress(-1,0));
    new KeyPressListener('ArrowUp', () => handleArrowPress(0,-1));
    new KeyPressListener('ArrowRight', () => handleArrowPress(1,0));
    new KeyPressListener('ArrowDown', () => handleArrowPress(0,1));
    new KeyPressListener('ControlRight', () => socket.emit('changeColor'))
}

function handleArrowPress(dx,dy){
    socket.emit('move',dx,dy,map.cellSize);
}

socket.on('players', function(playersList){
    players = playersList;
    drawGame(map,players)
});

socket.on('teleport', function(port){
    window.location.href = 'http://localhost:' + port;
});

initGame();

credentialsSender.onclick = function(){
    const credentials = document.getElementById('credentials').value;
    document.getElementById('connected').innerHTML = 'connected as : ' + credentials;
    socket.emit('credentialsConnect', credentials);
    console.log('get sender onclick');
};