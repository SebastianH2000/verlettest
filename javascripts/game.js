//ctx.fillRect(0,0,canX,canY);


scaleWindow();
ctx.fillStyle = "white";
ctx.fillRect(0-canX/2,0-canY/2,canX,canY);

setInterval(mainLoop,20);
function mainLoop() {
    scaleWindow();
    checkPlayerMovement();
    clearCanvas();
    drawWorld();
    //drawWorld();
    playerOnMove();
    //World[0][0].ctx.fillStyle = "black";
    //World[0][0].ctx.fillRect(0,0,50,50);

    ctx.fillStyle = "red";
    ctx.fillRect(-16,-32,32,64);

    //outline(0,0);
    //outline(-1,0);
    //player.y = -240;
    //clearCanvas();
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