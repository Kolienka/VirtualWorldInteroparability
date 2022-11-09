let playerPosition = [0,0];

const map = { //define a maxX*maxY grid map

    cellSize : 70,

    minX : 0,
    maxX : 6,
    minY : 0,
    maxY : 6
}

function initGame(){

    const matrixMap = new Array(map.maxY).fill(0).map(() => new Array(map.maxX).fill(0));

    drawGrid(map.maxX,map.maxY, map.cellSize);
    drawPlayer(playerPosition,map.cellSize);

    new KeyPressListener('ArrowLeft', () => handleArrowPress(-1,0));
    new KeyPressListener('ArrowUp', () => handleArrowPress(0,-1));
    new KeyPressListener('ArrowRight', () => handleArrowPress(1,0));
    new KeyPressListener('ArrowDown', () => handleArrowPress(0,1));
}

function handleArrowPress(dx,dy){
    console.log(dx,dy);
    playerPosition[0] += dx*map.cellSize;
    playerPosition[1] += dy*map.cellSize;
    drawPlayer(playerPosition,map.cellSize);
}

initGame();