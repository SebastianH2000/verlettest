var can = document.getElementById("myCanvas");
var ctx = can.getContext("2d");

var canX = 1920;
var canY = 1080;
can.width = canX;
can.height = canY;


var screenScale = 1.25;




function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    if (r !== undefined && g == undefined && b == undefined) {
        return "#" + componentToHex(r) + componentToHex(r) + componentToHex(r);
    }
    else {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

function clearCanvas() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(0 - (canX / 2)/screenScale, 0 - (canY / 2)/screenScale, canX/screenScale, canY/screenScale);
}

function drawSquare(x1, y1, size, ctxObj) {
    if (ctxObj === undefined) {
        ctx.beginPath();
        ctx.fillRect(x1, y1, size, size);
        ctx.closePath();
    }
    else {
        ctxObj.beginPath();
        ctxObj.fillRect(x1, y1, size, size);
        ctxObj.closePath();
    }
}

function newCanvas(id,divId) {
    let canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = 256;
    canvas.height = 256;
    document.getElementById("canvasStorage").appendChild(canvas);
};

function outline(x,y) {
    ctx.beginPath();
    ctx.rect(x*256-player.x,y*256+player.y,256,256);
    ctx.stroke();
}
