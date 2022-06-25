newCanvas('riverCan','canvasStorage',2176,1080);

var riverCan = document.getElementById('riverCan');
var riverCtx = riverCan.getContext('2d');

var riverChangeAmt = 0;

function drawRiver() {
    if (Math.floor(xOff/256) + 2 > riverChangeAmt) {
        //clearCanvas('white',riverCtx,2176,1080);
        riverCtx.clearRect(0,0,2176,1080);
        /*for (let i = 0; i < 20; i++) {
            if (i % 2 === 0) {
                riverCtx.fillStyle = "blue"
                riverCtx.fillRect(i*128,0,128,1080);
            }
            else {
                riverCtx.fillStyle = "darkblue"
                riverCtx.fillRect(i*128,0,128,1080);
            }
        }*/
        riverCtx.fillStyle = rgbToHex(10,10,40)
        riverCtx.fillRect(0,680,2176,1080)
        //riverCtx.fillStyle = "blue"
        //riverCtx.fillRect(0,0,2176,1080);
        riverChangeAmt++;
    }

    ctx.drawImage(riverCan,0-canX/2+xMod-256,0-canY/2,);
    //console.log(xMod)
}

newCanvas('frontFogCan','canvasStorage',1920,400);

var frontFogCan = document.getElementById('frontFogCan');
var frontFogCtx = frontFogCan.getContext('2d');
frontFogCtx.globalAlpha = 0.25;
var frontFogColor = ImprovedNoise.noise(mainTimer/10,noiseSeed,xOff/100)/2+0.5;

//function lerp(v0,v1,t) {
    //return (1 - t) * v0 + t * v1;
//}

function drawFrontFog() {
    let pixelSize = 4;
    var frontFogDensity = ImprovedNoise.noise(mainTimer/7,noiseSeed,xOff/321)/4+0.25;
    frontFogCtx.globalAlpha = frontFogDensity;
    frontFogColor = [0,ImprovedNoise.noise(mainTimer/30,noiseSeed,xOff/100.76)/2+0.5,ImprovedNoise.noise(randOff,noiseSeed,xOff/45.8)/2+0.5];
    //frontFogCtx.fillStyle = rgbToHex(Math.floor(lerp(25,255,frontFogColor)),255,255)
    frontFogCtx.fillStyle = rgbToHex(60,Math.floor(lerp(0,155,frontFogColor[1])),Math.floor(lerp(120,240,frontFogColor[2])));
    //frontFogCtx.fillStyle = 'lightgray'
    frontFogCtx.clearRect(0,0,1920,400);
    //frontFogDir = Math.sin(mainTimer/20);
    for (let w = 2; w < 5; w++) {
        for (let i = 0; i < 1920/pixelSize; i++) {
            for (let j = 0; j < 400/pixelSize; j++) {
                if (ImprovedNoise.noise(i/100+(xOff*frontWindDir/w)/200+w*30,j/8,mainTimer/(100/w)+w*30+noiseSeed) > 1.3 - j/(150/(w/2+1))) {
                    frontFogCtx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
                }
            }
        }
    }
    ctx.drawImage(frontFogCan,0-canX/2,canY/2-400);
}





/*var region = 'surface';
var humidity = 0.5;
var heat = 0.5;


function updateBackground() {
    backCtx.clearRect(0,0,480,270);
    backCtx.fillStyle = 'black'

    let terrainRoughness = 1;

    for (let i = 0; i < 240; i++) {
        player.x = mainTimer*100;
        let yLevel = getHeightMap(player.x-(i)+120);
        //draw back parallax layer
        //drawSquare(i*2,ImprovedNoise.noise(i/100+mainTimer/40,noiseSeed,160.75)*30+150,2,backCtx);
        drawSquare(480-i*2,Math.min(yLevel,0)+170,2,backCtx);

        let yLevel2 = getHeightMap(player.x-(i)+120,100);
        drawSquare(480-i*2,Math.min(yLevel2,0)+170,2,backCtx);
    }

}*/
