var loaded = false;

setInterval(mainLoop,20);
function mainLoop() {
    scaleWindow();
    if (loaded) checkPlayerMovement();
    clearCanvas();
    drawWorld();
    //drawWorld();
    if (loaded) playerOnMove();
    //World[0][0].ctx.fillStyle = "black";
    //World[0][0].ctx.fillRect(0,0,50,50);

    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(-16,-32,32,64);
    ctx.globalAlpha = 1;

    //outline(0,0);
    //outline(-1,0);
    //player.y = -240;
    //clearCanvas();

    ctx.fillStyle = "black";
    //ctx.fillRect(absMod(0-player.x,16),player.y%16,16,16);
    //let pixelVal = pixelToWorldTile(player.x,player.y-32);
    //console.log(pixelToWorldTile(player.x,player.y-32).charAt(0));
    //console.log(pixelVal.charAt(0));
    //pixelToWorldTile(player.x,player.y)
    if (player.spectate) {
        outline(Math.floor(player.x/256),Math.floor(player.y/-256));
        ctx.fillRect(mouseX,mouseY,5,5);
    }
    if (mouseLIsDown) {
        if ((mouseX > 16 || mouseX < -16) || (mouseY > 32 || mouseY < -32)) {
            placeTile(player.x+mouseX,player.y-mouseY);
        }
    }
    else if (mouseRIsDown) {
        deleteTile(player.x+mouseX,player.y-mouseY);
    }
    drawHotbar();
    window.scrollTo(0, 0);
}



/*var mainTimer = 0;
ctx.fillStyle = "white";
ctx.fillRect(0-canX/2,0-canY/2,canX,canY);

function mainLoop() {
    scaleWindow();
    ctx.fillStyle = "white";
    ctx.fillRect(0-canX/2,0-canY/2,canX,canY);

    //ctx.clearRect(0-canX/2,0-canY/2,canX,canY);
    ctx.fillStyle = "black";
    for (let i = 0; i < canX/2; i++) {
        ctx.fillRect(i-canX/4,ImprovedNoise.noise(mainTimer,i/10,0.5)*20,1,1);
    }
    mainTimer += 50/1000;
}

setInterval(mainLoop,20);*/

window.onload = function() {
    loaded = true;
}
