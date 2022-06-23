var World = [];

var noiseSeed = Math.random()*1000;
//var noiseSeed = 680.178573998786;
//var noiseSeed = 977.4558480555837;
var noiseSeed2 = noiseSeed/120;

var spawnY = 0;

function createChunk(x, y) {
    //World[x][y] = Math.random();
    //console.log('chunkCreated');
    World[x][y] = {};

    for (let i = 1; i < 17; i++) {
        for (let j = 1; j < 17; j++) {
            let xCoord = fromBijective(x) * 16 + i;
            let yCoord = fromBijective(y) * 16 + j;
            //let heightMap = Math.abs(perlin.get(xCoord / 150.576, 0.5)) * 60 - 10 + Math.abs(perlin.get(xCoord / 75.288, 2.5)) * 30 - 5 + Math.abs(perlin.get(xCoord / 37.644, 5.5)) * 15 - 2.5;
            let octaveAmt = 5;
            let heightMap = 0;
            for (let a = 1; a <= octaveAmt; a++) {
                heightMap += Math.abs(ImprovedNoise.noise(xCoord/(150.576/octaveAmt),octaveAmt*5,octaveAmt*noiseSeed))*(60/(octaveAmt*2)) - (10/(octaveAmt*2));
            }
            heightMap += Math.abs(ImprovedNoise.noise(xCoord/2000,3700.6,noiseSeed))*(600) - (100);

            if (x === 0 && y === 0 && i === 1 ) {
                spawnY = Math.max(Math.max(Math.floor(heightMap)*16-224,-240),spawnY);
                player.y = spawnY;
            } else if (x === 2 && y === 0 && i === 16 ) {
                spawnY = Math.max(Math.floor(heightMap)*16-224,-256);
            }

            World[x][y]['x' + i + 'y' + j] = {
                materialType: 0,
                material: 0,
            }
            World[x][y]['yCoord'] = yCoord - j;

            if (yCoord > heightMap) {
                if (yCoord < 0 && yCoord > heightMap) {
                    World[x][y]['x' + i + 'y' + j].materialType = 2;
                    World[x][y]['x' + i + 'y' + j].material = 'water';
                }
                else {
                    World[x][y]['x' + i + 'y' + j].materialType = 0;
                    World[x][y]['x' + i + 'y' + j].material = 'air';
                }
            }
            else if (yCoord + 1 > heightMap && yCoord > -2) {
                World[x][y]['x' + i + 'y' + j].materialType = 1;
                World[x][y]['x' + i + 'y' + j].material = 'grass';
            }
            else if (yCoord + (10 + Math.random() * 5) > heightMap) {
                World[x][y]['x' + i + 'y' + j].materialType = 1;
                World[x][y]['x' + i + 'y' + j].material = 'dirt';
            }
            else if (yCoord < heightMap - 15 && ImprovedNoise.noise(xCoord/8,yCoord/8,noiseSeed) > 0.8 - Math.min(Math.max(Math.pow(Math.abs(yCoord/1000),0.5),0),0.2)) {
                World[x][y]['x' + i + 'y' + j].materialType = 1;
                World[x][y]['x' + i + 'y' + j].material = 'coal';
            }
            else if (yCoord < heightMap - 25 && ImprovedNoise.noise(xCoord/10+300,yCoord/10+400,noiseSeed) > 0.85 - Math.min(Math.max(Math.pow(Math.abs(yCoord/1000),0.5),0),0.2)) {
                World[x][y]['x' + i + 'y' + j].materialType = 1;
                World[x][y]['x' + i + 'y' + j].material = 'iron';
            }
            else if (yCoord < heightMap - 50 && ImprovedNoise.noise(xCoord/12-300,yCoord/12-400,noiseSeed) > 0.875 - Math.min(Math.max(Math.pow(Math.abs(yCoord/1000),0.5),0),0.2)) {
                World[x][y]['x' + i + 'y' + j].materialType = 1;
                World[x][y]['x' + i + 'y' + j].material = 'gold';
            }
            else {
                World[x][y]['x' + i + 'y' + j].materialType = 1;
                World[x][y]['x' + i + 'y' + j].material = 'stone';
            }
        }
    }

    newCanvas('Canx' + x + 'y' + y);
    World[x][y]['can'] = document.getElementById('Canx' + x + 'y' + y);
    World[x][y]['ctx'] = World[x][y].can.getContext("2d");

    drawWorldCan(fromBijective(x),fromBijective(y));
}

function scanChunks() {
    for (let i = player.windowX1; i < player.windowX2; i++) {
        for (let j = player.windowY1; j < player.windowY2; j++) {
            tempChunkX = i;
            tempChunkY = j;
            if (World[toBijective(tempChunkX)] === undefined) {
                World[toBijective(tempChunkX)] = new Array();
            }

            //+/-x, +/-y
            if (tempChunkX > 0) {
                if (tempChunkY > 0 && World[tempChunkX * 2 - 1][tempChunkY * 2 - 1] === undefined) {
                    createChunk(toBijective(tempChunkX), toBijective(tempChunkY));
                };

                if (tempChunkY <= 0 && World[tempChunkX * 2 - 1][Math.abs(tempChunkY) * 2] === undefined) {
                    createChunk(toBijective(tempChunkX), toBijective(tempChunkY));
                }
            }

            if (tempChunkX <= 0) {
                if (tempChunkY > 0 && World[Math.abs(tempChunkX) * 2][tempChunkY * 2 - 1] === undefined) {
                    createChunk(toBijective(tempChunkX), toBijective(tempChunkY));
                };

                if (tempChunkY <= 0 && World[Math.abs(tempChunkX) * 2][Math.abs(tempChunkY) * 2] === undefined) {
                    createChunk(toBijective(tempChunkX), toBijective(tempChunkY));
                }
            }
        }
    }
}

var lastType = 0;
var fillTrue = 0;
var lastChunkX = 0;
var lastChunkY = 0;
var lastChunkPiece = 0;

function drawWorldCan(x, y) {
    if (World[toBijective(x)] !== undefined) {
        if (World[toBijective(x)][toBijective(y)] !== 0 && World[toBijective(x)][toBijective(y)] !== undefined) {
            World[toBijective(x)][toBijective(y)].ctx.beginPath();
            World[toBijective(x)][toBijective(y)].ctx.clearRect(0,0,256,256);
            for (let q = 1; q < 17; q++) {
                for (let w = 1; w < 17; w++) {
                    let thisY = Math.abs((y*16)+w);
                    let thisBlock = World[toBijective(x)][toBijective(y)]['x' + q + 'y' + w];
                    /*if (lastChunkX === x && lastChunkY === y) {
                        thisBlock = lastChunkPiece['x' + q + 'y' + w];
                    }
                    else {
                        thisBlock = World[toBijective(x)][toBijective(y)]['x' + q + 'y' + w];
                    }
                    if (x !== lastChunkX) {
                        lastChunkX = x;
                    }
                    if (y !== lastChunkY) {
                        lastChunkY = y;
                    }
                    lastChunkPiece = World[toBijective(x)][toBijective(y)];*/

                    //if (thisBlock === '1001') {
                    //ctx.fillStyle = rgbToHex(200,100,50);
                    //fillTrue = false;
                    //ctx.drawImage(grassTileSingleImg, iBi*160-playerX-q*-20-100, jBi*160+playerY-w*20+80, 20, 20);
                    //}

                    //let tempCtx = World[toBijective(i)][toBijective(j)].ctx
                    //if (thisBlock !== lastType) {
                    if (thisBlock.materialType !== 'air') {
                        fillTrue = false;
                        if (thisBlock.material === 'dirt') {
                            World[toBijective(x)][toBijective(y)].ctx.fillStyle = rgbToHex(200, 100, 50);
                            fillTrue = true;
                            //ctx.drawImage(grassTileSingleImg, iBi*160-playerX-q*-20-100, jBi*160+playerY-w*20+80, 20, 20);
                        }
                        if (thisBlock.material === 'stone') {
                            World[toBijective(x)][toBijective(y)].ctx.fillStyle = rgbToHex(100, 100, 120);
                            fillTrue = true;
                        }
                        else if (thisBlock.material === 'coal') {
                            World[toBijective(x)][toBijective(y)].ctx.fillStyle = rgbToHex(10, 10, 10);
                            fillTrue = true;
                        }
                        else if (thisBlock.material === 'iron') {
                            World[toBijective(x)][toBijective(y)].ctx.fillStyle = 'beige';
                            fillTrue = true;
                        }
                        else if (thisBlock.material === 'gold') {
                            World[toBijective(x)][toBijective(y)].ctx.fillStyle = 'gold';
                            fillTrue = true;
                        }
                        else if (thisBlock.material === 'water') {
                            //World[toBijective(x)][toBijective(y)].ctx.fillStyle = 'blue';
                            World[toBijective(x)][toBijective(y)].ctx.fillStyle = rgbToHex(0, 0, Math.max(255-thisY*3,0));
                            fillTrue = true;
                        }
                        else if (thisBlock.material === 'grass') {
                            World[toBijective(x)][toBijective(y)].ctx.fillStyle = 'green';
                            fillTrue = true;
                        }
                    }
                    //}
                    if (fillTrue === true) {
                        //drawSquare(iBi * 256 - player.x - q * -16 - 80, jBi * 256 + player.y - w * 16 + 64, 17, World[toBijective(i)][toBijective(j)].ctx);
                        //drawSquare((player.x % 256) - q * -16 - 128,(player.y % 256) - w * 16 + 128,17,World[toBijective(i)][toBijective(j)].ctx);
                        drawSquare((q - 1) * 16, 256 - (w * 16), 17, World[toBijective(x)][toBijective(y)].ctx);
                        //drawSquare
                    }
                    lastType = thisBlock;
                }
            }
        }
    }
}

function drawWorld() {
    for (let i = player.windowX1; i < player.windowX2; i++) {
        if (World[toBijective(i)] !== undefined) {
            for (let j = player.windowY1; j < player.windowY2; j++) {
                if (World[toBijective(i)][toBijective(j)] !== 0 && World[toBijective(i)][toBijective(j)] !== undefined) {
                    let iBi = fromBijective(toBijective(i));
                    let jBi = fromBijective(toBijective(j)) * -1;
                    ctx.drawImage(World[toBijective(i)][toBijective(j)].can, iBi * 256 - player.x, jBi * 256 + player.y);
                }
            }
        }
    }
}

/*function calcWorldPosFromPixels(x,y) {
    let xTile = Math.floor(x/16);
    let yTile = Math.floor(y/16);
}*/
