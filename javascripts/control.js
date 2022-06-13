//dynamically scale the game window
function scaleWindow() {
    document.body.style.transform = "scale(1)";
    let win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth,
        y = win.innerHeight || docElem.clientHeight || body.clientHeight;
    document.body.style.transform = "scale(" + Math.min(x / canX, y / canY) + ")";
    document.body.style.height = y + "px";
    let scaleFactor = Math.min(x / canX, y / canY);

    /*if (x/canX < y/canY) {
      document.body.style.margin = (((y - (canY*scaleFactor))/2) + "px 0px 0px 0px");
    }
    else {
      document.body.style.margin = (((y - (canY*scaleFactor))/2) + "px 0px 0px 0px");
    }*/
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(can.width / 2, can.height / 2);
    ctx.scale(1 * screenScale, 1 * screenScale);
}
window.onload = function () {
    scaleWindow();
}



//mouse functions
var clicked = false;
var clickedX = 0;
var clickedY = 0;
var clickTimer = 0;

function mouseDown() {
    if (clicked === false) {
        clickedX = mouseX;
        clickedY = mouseY;
    }
    clicked = true;
}

function mouseUp() {
    clicked = false;
    clickTimer = 0.5;
}


(function () {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0);
        }

        mouseX = event.pageX * screenScale - (canX / 2);
        mouseY = (event.pageY * screenScale - (canY / 2)) * -1;
        //console.log(mouseX + "," + mouseY)
    }
})();



//bijective functions
function toBijective(x) {
    if (x > 0) {
        return x * 2 - 1;
    }
    else {
        return Math.abs(x) * 2;
    }
}

function fromBijective(x) {
    if (x % 2 === 1) {
        return (x + 1) / 2;
    }
    else {
        return x / -2;
    }
}
