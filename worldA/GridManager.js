const grid = document.getElementById("grid");
const context = grid.getContext("2d")

function drawPlayer(coordinates = [0,0],cellSize){
    context.beginPath();
    context.arc(coordinates[0] + cellSize/2, coordinates[1] + cellSize/2, cellSize/2, 0, 2*Math.PI);
    context.stroke();
}

function drawGrid(maxX, maxY, cellSize){
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
}

