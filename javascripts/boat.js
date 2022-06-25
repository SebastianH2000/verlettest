newCanvas('boatCan','canvasStorage',256,256);

var boatCan = document.getElementById('boatCan');
var boatCtx = boatCan.getContext('2d');

var boatStyle = 0;
if (String(noiseSeed)[0] < 8) {
    boatStyle = 'basic';
}
else {
    boatStyle = 'fancy'
}

boatStyle = 'basic'

function drawBoat() {
    if (boatStyle === 'basic') {
        //boatCtx.fillStyle = 'brown';
        //boatCtx.fillRect(0,0,50,50)

        boatCtx.fillStyle = rgbToHex(107, 28, 0);
        boatCtx.fillRect(100,100,120,16);
        boatCtx.fillRect(120,112,60,12);
    }
    else if (boatStyle === 'fancy') {
        boatCtx.fillStyle = 'red';
        boatCtx.fillRect(0,0,50,50);
    }

    ctx.drawImage(boatCan,-128,canY/2-350-Math.floor(ImprovedNoise.noise(mainTimer,noiseSeed,10.7)*8));
}