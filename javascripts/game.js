var fps = 30;

setInterval(mainLoop,1000/fps);
var mainTimer = 0;
var xOff = 0;
var xMod = 0; 
var randOff = 0;
var gameSpeed = 3;

function mainLoop() {
    scaleWindow();
    clearCanvas('black');



    if (scrubMode) {
        if ((pressedRight || map[68] || map[39]) && !(pressedLeft || map[65] || map[37])) {
            mainTimer += gameSpeed/fps*3;
        }
        else if (!(pressedRight || map[68] || map[39]) && (pressedLeft || map[65] || map[37])) {
            mainTimer -= gameSpeed/fps*3;
        }
    }
    else {
        mainTimer += gameSpeed/fps;
    }
    xOff = 0 - mainTimer * 10;
    xMod = absMod(xOff,256);
    randOff = ImprovedNoise.noise(mainTimer/20,noiseSeed,34.87)/20;

    updateFrontWeather();
    drawRiver();
    drawBoat();
    drawFrontFog();
}