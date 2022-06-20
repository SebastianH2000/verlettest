var player = {
    x: 0,
    y: 0,
    velX: 0,
    velY: 0,
    chunkX: Math.round(this.x / 256),
    chunkY: Math.round(this.y / 256),
    windowX1: Math.floor((this.x - (canX / 2)) / 256) - 1,
    windowY1: Math.floor((this.y - (canY / 2)) / 256) - 1,
    windowX2: Math.ceil((this.x + (canX / 2)) / 256) + 1,
    windowY2: Math.ceil((this.y + (canY / 2)) / 256) + 1,
    spectate: false,
    isGrounded: true,
    underwater: false,
    calcStats(val) {
        this.chunkX = Math.round(this.x / 256);
        this.chunkY = Math.round(this.y / 256);
        this.windowX1 = Math.floor((this.x - (canX / 2)) / 256) - 1;
        this.windowY1 = Math.floor((this.y - (canY / 2)) / 256) - 1;
        this.windowX2 = Math.ceil((this.x + (canX / 2)) / 256) + 1;
        this.windowY2 = Math.ceil((this.y + (canY / 2)) / 256) + 1;

        if (pixelToWorldTile(this.x,this.y-32).materialType === 2 || pixelToWorldTile(this.x-16,this.y-32).materialType === 2 || pixelToWorldTile(this.x+16,this.y-32).materialType === 2 || pixelToWorldTile(this.x,this.y-24).materialType === 2 || pixelToWorldTile(this.x-16,this.y-24).materialType === 2 || pixelToWorldTile(this.x+16,this.y-24).materialType === 2) {
            this.underwater = true;
        }
        else {
            if (this.underwater && this.velY > 0) {
                this.velY --;
            }
            this.underwater = false;
        }
        if (pixelToWorldTile(this.x,this.y-32).materialType === 1 || pixelToWorldTile(this.x-16,this.y-32).materialType === 1 || pixelToWorldTile(this.x+16,this.y-32).materialType === 1) {
            this.isGrounded = true;
        }
        else {
            this.isGrounded = false;
        }
    },
    applyPhysics() {
        if (!this.underwater) { 
            if (!this.isGrounded) {
                this.velY -= 0.2;
            }
            else if (this.velY < 0) {
                this.velY = 0;
            }
            if (pixelToWorldTile(this.x,this.y-20).materialType === 1 || pixelToWorldTile(this.x-16,this.y-20).materialType === 1 || pixelToWorldTile(this.x+16,this.y-20).materialType === 1) {
                this.y += 8;
            }
            else if (pixelToWorldTile(this.x,this.y-30).materialType === 1 || pixelToWorldTile(this.x-16,this.y-30).materialType === 1 || pixelToWorldTile(this.x+16,this.y-30).materialType === 1) {
                this.y += 2;
            }
        }
        else {
            //console.log(this.isGrounded)
            if (!this.isGrounded) {
                if (this.velY < -3.5) {
                    this.velY = -3.5;
                }
                else {
                    this.velY -= 0.075;
                }
            }
            else if (this.velY < 0) {
                this.velY = 0;
            }
            if (pixelToWorldTile(this.x,this.y-20).materialType === 1 || pixelToWorldTile(this.x-16,this.y-20).materialType === 1 || pixelToWorldTile(this.x+16,this.y-20).materialType === 1) {
                this.y += 8;
            }
            else if (pixelToWorldTile(this.x,this.y-30).materialType === 1 || pixelToWorldTile(this.x-16,this.y-30).materialType === 1 || pixelToWorldTile(this.x+16,this.y-30).materialType === 1) {
                this.y += 2;
            }
        }

        player.x += player.velX;
        player.y += player.velY;
    },
}

function playerOnMove() {
    //console.log("he")
    scanChunks();
    player.calcStats();
    player.applyPhysics();
}

function playerJump() {
    //playerOnMove();
    if (player.spectate) {
        player.y += 5;
    }
    else {
        if (player.isGrounded) {
            player.velY = 7;
        }
    }
}

function playerDown() {
    //playerOnMove();
    if (player.spectate) {
        player.y -= 5;
    }
    else {
        /*let testX1 = player.x;
        let testX2 = player.x;
        let testX3 = player.x;*/
        let testX1 = player.x;
        let testX2 = player.x-16;
        let testX3 = player.x+16;
        let testY = player.y-32;
        if (pixelToWorldTile(testX1,testY).materialType !== 0 || pixelToWorldTile(testX2,testY).materialType !== 0 || pixelToWorldTile(testX3,testY).materialType !== 0) {
            /*World[toBijective(Math.floor(testX1/256))][toBijective(Math.floor(testY/256)+1)]["x" + Math.floor(absMod(Math.floor(testX1/16),16)+1) + "y" + Math.floor(absMod(Math.floor(testY/16),16)+1)] = '0000';
            World[toBijective(Math.floor(testX1/256))][toBijective(Math.floor(testY/256)+1)]["x" + Math.floor(absMod(Math.floor(testX1/16),16)+1) + "y" + Math.floor(absMod(Math.floor(testY/16),16)+1)] = '0000';
            drawWorldCan(Math.floor(testX1/256),Math.floor(testY/256)+1);
            drawWorldCan(Math.floor(testX2/256),Math.floor(testY/256)+1);*/
            deleteTile(testX1,testY);
            deleteTile(testX2,testY);
            deleteTile(testX3,testY);
        }
    }
    //Math.floor(x/16),Math.floor((y+256)/16)
    //toBijective(Math.floor(x/16))
    //World[xPos][yPos]["x" + Math.floor(absMod(x,16)+1) + "y" + Math.floor(absMod(y,16)+1)]
}

function playerRight() {
    //playerOnMove();
    if (player.spectate) {
        player.x += 5;
    }
    if (pixelToWorldTile(player.x+19,player.y-8).materialType !== 1) {
        player.x += 5;
    }
    else if (pixelToWorldTile(player.x+16,player.y-8).materialType !== 1) {
        player.x--;
    }
}

function playerLeft() {
    //playerOnMove();
    if (player.spectate) {
        player.x -= 5;
    }
    if (pixelToWorldTile(player.x-19,player.y-8).materialType !== 1) {
        player.x -= 5;
    }
    else if (pixelToWorldTile(player.x-16,player.y-8).materialType !== 1) {
        player.x++;
    }
}





function checkPlayerMovement() {
    if ((map[87] === true || map[38] === true) && (map[83] === false && map[40] === false) && (map[65] === false && map[37] === false) && (map[68] === false && map[39] === false)) {
        playerJump();
    }
    //s
    else if ((map[87] === false && map[38] === false) && (map[83] === true || map[40] === true) && (map[65] === false && map[37] === false) && (map[68] === false && map[39] === false)) {
        playerDown();
    }
    //a
    else if ((map[87] === false && map[38] === false) && (map[83] === false && map[40] === false) && (map[65] === true || map[37] === true) && (map[68] === false && map[39] === false)) {
        playerLeft();
    }
    //d
    else if ((map[87] === false && map[38] === false) && (map[83] === false && map[40] === false) && (map[65] === false && map[37] === false) && (map[68] === true || map[39] === true)) {
        //playerX += (playerSpeed*10)/fps;
        playerRight();
    }



    //w+a
    if ((map[87] === true || map[38] === true) && (map[65] === true || map[37] === true)) {
        //playerY += (playerSpeed*7)/fps;
        //playerX -= (playerSpeed*7)/fps;
        playerJump();
        playerLeft();
    }
    //w+d
    if ((map[87] === true || map[38] === true) && (map[68] === true || map[39] === true)) {
        playerJump();
        playerRight();
    }
    //s+a
    if ((map[83] === true || map[40] === true) && (map[65] === true || map[37] === true)) {
        playerDown();
        playerLeft();
    }
    //s+d
    if ((map[83] === true || map[40] === true) && (map[68] === true || map[39] === true)) {
        playerDown();
        playerRight();
    }


}

//key pressed function
var map = {}; // You could also use an array
//wsad
map[87] = false;
map[83] = false;
map[65] = false;
map[68] = false;

//^v<>
map[38] = false;
map[40] = false;
map[37] = false;
map[39] = false;

map[32] = false;

onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}
