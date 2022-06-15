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
    calcStats(val) {
        this.chunkX = Math.round(this.x / 256);
        this.chunkY = Math.round(this.y / 256);
        this.windowX1 = Math.floor((this.x - (canX / 2)) / 256) - 1;
        this.windowY1 = Math.floor((this.y - (canY / 2)) / 256) - 1;
        this.windowX2 = Math.ceil((this.x + (canX / 2)) / 256) + 1;
        this.windowY2 = Math.ceil((this.y + (canY / 2)) / 256) + 1;

        if (pixelToWorldTile(this.x,this.y-32).charAt(0) === '0' && pixelToWorldTile(this.x-16,this.y-32).charAt(0) === '0' && pixelToWorldTile(this.x+16,this.y-32).charAt(0) === '0') {
            this.isGrounded = false;
        }
        else {
            this.isGrounded = true;
        }
    },
    applyPhysics() {
        if (!this.isGrounded) {
            this.velY -= 0.2;
        }
        else if (this.velY < 0) {
            this.velY = 0;
        }
        if (pixelToWorldTile(this.x,this.y-20).charAt(0) !== '0' || pixelToWorldTile(this.x-16,this.y-20).charAt(0) !== '0' || pixelToWorldTile(this.x+16,this.y-20).charAt(0) !== '0') {
            this.y += 8;
        }
        else if (pixelToWorldTile(this.x,this.y-30).charAt(0) !== '0' || pixelToWorldTile(this.x-16,this.y-30).charAt(0) !== '0' || pixelToWorldTile(this.x+16,this.y-30).charAt(0) !== '0') {
            this.y += 2;
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
}

function playerRight() {
    //playerOnMove();
    if (player.spectate) {
        player.x += 5;
    }
    player.x += 5;
}

function playerLeft() {
    //playerOnMove();
    if (player.spectate) {
        player.x -= 5;
    }
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
