const grid = document.getElementById("grid");
const context = grid.getContext("2d")

function drawGame(mapData, players){
    context.clearRect(0,0,mapData.maxX * mapData.cellSize, mapData.maxY * mapData.cellSize);
    drawGrid(mapData.maxX,mapData.maxY,mapData.cellSize);
    drawPlayers(players, mapData.cellSize);
}

function drawPlayers(players,cellSize){
    players.forEach(player => {
        const x = player.x*cellSize + cellSize/2;
        const y = player.y*cellSize + cellSize/2;
        const radius = cellSize/2;
        context.beginPath();
        context.arc(x,y,radius, cellSize/2, 0, 2*Math.PI);
        context.stroke();
        context.fillStyle = player.color;
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
    context.fillStyle = "orange";
    context.fillRect((maxX-1)*cellSize,(maxY-1)*cellSize,cellSize,cellSize);
}

