const grid = document.getElementById("grid");
const context = grid.getContext("2d")

function drawGame(mapData, coordinates){
    context.clearRect(0,0,mapData.maxX * mapData.cellSize, mapData.maxY * mapData.cellSize);
    drawGrid(mapData.maxX,mapData.maxY,mapData.cellSize);
    drawPlayer(coordinates, mapData.cellSize);
}

function drawPlayers(players,cellSize){
    players.forEach(player => {
        context.beginPath();
        context.arc(player[0] + cellSize/2, player[1] + cellSize/2, cellSize/2, 0, 2*Math.PI);
        context.stroke();
        context.fillStyle = "red";
        context.fill();
    });
}

function drawGrid(maxX, maxY, cellSize){
    context.beginPath();
    for (let x = 0; x <= maxX; x ++) {
        context.moveTo(x*cellSize,0);
        context.lineTo(x*cellSize,maxY*cellSize);
    }           

    for (let y = 0; y <= maxY; y ++) {
        context.moveTo(0,y*cellSize);
        context.lineTo(maxX*cellSize,y*cellSize);
    }
    context.strokeStyle = "black";
    context.stroke();
    context.fill();
}

