import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("ws://localhost:3000");

let players = [];

const map = { //define a maxX*maxY grid map

    cellSize : 70,

    minX : 0,
    maxX : 6,
    minY : 0,
    maxY : 6
}

function initGame(){

    drawGrid(map.maxX,map.maxY, map.cellSize);
    drawPlayers(players,map.cellSize);

    new KeyPressListener('ArrowLeft', () => handleArrowPress(-1,0));
    new KeyPressListener('ArrowUp', () => handleArrowPress(0,-1));
    new KeyPressListener('ArrowRight', () => handleArrowPress(1,0));
    new KeyPressListener('ArrowDown', () => handleArrowPress(0,1));
}

function handleArrowPress(dx,dy){
    socket.emit('move',dx,dy,map.cellSize);
    //playerPosition[0] += dx*map.cellSize;
    //playerPosition[1] += dy*map.cellSize;
    //drawGame(map,playerPosition);
}

socket.on('players', function(playersList){
    //console.log(players)
    players = playersList;
});

socket.on('move',function(coordinates){
    drawGame(map,coordinates);
});

initGame();