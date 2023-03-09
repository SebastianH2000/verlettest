var can = document.getElementById("myCanvas");
var ctx = can.getContext("2d");

var canX = 1920;
var canY = 1080;
can.width = canX;
can.height = canY;


var screenScale = 1;




function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    if (r !== undefined && g == undefined && b == undefined) {
        return "#" + componentToHex(r) + componentToHex(r) + componentToHex(r);
    }
    else {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

function clearCanvas(color,id,x,y) {
    let ctxId = id || ctx;
    if (ctxId !== ctx) {
        ctxId.fillStyle = color;
        ctxId.fillRect(0, 0, x, y);
    }
    else {
        ctxId.fillStyle = color;
        ctxId.fillRect(0 - (canX / 2)/screenScale, 0 - (canY / 2)/screenScale, canX/screenScale, canY/screenScale);
    }
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

function drawCircle(x,y,r,ctxObj) {
    ctxObj.beginPath();
    ctxObj.arc(x,y,r,0,360);
    ctxObj.fill();
    ctxObj.closePath();
}

function strokeCircle(x,y,r,w,ctxObj) {
    ctxObj.beginPath();
    ctxObj.arc(x,y,r,0,360);
    ctxObj.lineWidth = w;
    ctxObj.stroke();
    ctxObj.closePath();
}

function newCanvas(id,divId,width,height) {
    let canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    document.getElementById(divId).appendChild(canvas);
};

function outline(x,y) {
    ctx.beginPath();
    ctx.rect(x*256-player.x,y*256+player.y,256,256);
    ctx.stroke();
}
