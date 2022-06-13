var player = {
    x: 0,
    y: 0,
    chunkX: Math.round(this.x / 256),
    chunkY: Math.round(this.y / 256),
    windowX1: Math.floor((this.x - (canX / 2)) / 256) - 1,
    windowY1: Math.floor((this.y - (canY / 2)) / 256) - 1,
    windowX2: Math.ceil((this.x + (canX / 2)) / 256) + 1,
    windowY2: Math.ceil((this.y + (canY / 2)) / 256) + 1,
    calcStats(val) {
        this.chunkX = Math.round(this.x / 256);
        this.chunkY = Math.round(this.y / 256);
        this.windowX1 = Math.floor((this.x - (canX / 2)) / 256) - 1;
        this.windowY1 = Math.floor((this.y - (canY / 2)) / 256) - 1;
        this.windowX2 = Math.ceil((this.x + (canX / 2)) / 256) + 1;
        this.windowY2 = Math.ceil((this.y + (canY / 2)) / 256) + 1;
    },
}

function playerOnMove() {
    player.calcStats();
    scanChunks();
}

function playerJump() {
    playerOnMove();
    player.y += 5;
}

function playerDown() {
    playerOnMove();
    player.y -= 5;
}

function playerRight() {
    playerOnMove();
    player.x += 5;
}

function playerLeft() {
    playerOnMove();
    player.x -= 5;
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
