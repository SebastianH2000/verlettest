var fps = 40;

var lastPageX = 0;
var lastPageY = 0;

//boundary types: 0 - circle, 1 - rectangle
var boundary = 0;
var radius = 300;

var gameX = 0;
var gameY = 0;

if (boundary === 0) {
    gameX = radius*2/particleWidth;
    gameY = radius*2/particleWidth;
    
}

var gameArr = new Array (Math.ceil(gameX));
for (let i = 0; i < gameArr.length; i++) {
    gameArr[i] = new Array (Math.ceil(gameY));
}

var particleAmt = 0;
var particleArr = [];
particleAmt++;
//particleArr.push(new Particle(100,0,'white'));
//particleArr.push(new Particle(250,0,'blue'));
//particleArr.push(new Particle(280,0,'blue'));

function safeGuard(n) {
    if (n === 0) {
        return 0.000001;
    }
    return n;
}

var longestWait = 0;
var ticks = 0;
var particleMax = 780;
//var colorArr = new Array(particleMax);

//print color array
function mouseDown(val) {
    let tempColorArr = new Array(particleArr.length);
    for (let i = 0; i < particleArr.length; i++) {
        let currentId = particleArr[i].id;
        tempColorArr[i] = (rgbToHex(Math.floor((Math.sin(particleArr[i].currentPos.x/25)+1)*122),0,0));
        particleArr[i].color = tempColorArr[i];
    }
    console.log(JSON.stringify(tempColorArr));
}

function mainLoop() {
    ticks++;
    let then = performance.now();
    let win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth,
        y = win.innerHeight || docElem.clientHeight || body.clientHeight;
    if ((lastPageX !== 0 && lastPageX !== x) || (lastPageY !== 0 && lastPageY !== y)) {
        scaleWindow();
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0-canX/2,0-canY/2,canX,canY);

    ctx.strokeStyle = "white";
    strokeCircle(0,0,radius+6,5,ctx);
    ctx.fillStyle = "white";

    let subSteps = 4;
    for (let j = 0; j < subSteps; j++) {
    //reset collision array
    for (let j = 0; j < gameArr.length; j++) {
        gameArr[j] = new Array (Math.ceil(gameY));
        for (let k = 0; k < gameArr[j].length; k++) {
            gameArr[j][k] = [];
        }
    }


    //run through full list of particles
    for (let i = 0; i < particleArr.length; i++) {
        //push current particle to collision array
        //gameArr[(Math.floor(particleArr[i].currentPos.x/particleWidth)+radius/particleWidth)][(Math.floor(particleArr[i].currentPos.y/particleWidth)+radius/particleWidth)].push(particleArr[i]);
        gameArr[Math.floor(particleArr[i].currentPos.x/particleWidth+radius/particleWidth)][Math.floor(particleArr[i].currentPos.y/particleWidth+radius/particleWidth)].push(particleArr[i]);
        //console.log(gameArr[(Math.floor(particleArr[i].currentPos.x/particleWidth)+radius/particleWidth)][(Math.floor(particleArr[i].currentPos.y/particleWidth)+radius/particleWidth)])
    }

    //clear particle array
    let particleArrLength = particleArr.length;
    particleArr = new Array(particleArrLength);


    for (let a = 1; a < gameArr.length-1; a++) {
        for (let b = 1; b < gameArr[a].length-1; b++) { //check each cell except for the ones are the borders
            let objectArr = []; //this array will be filled with all possible collidable particles from the 8 surrounding cells
            for (let c = -1; c < 2; c++) {
                for (let d = -1; d < 2; d++) { //loop through the current cell and the 8 surrounding ones in a 3x3 grid
                    if (gameArr[(a+c)][(b+d)].length > 0) { //if there's more than one particle here there is a possibility of a collision
                        for (let e = 0; e < gameArr[a+c][b+d].length; e++) { //loop through all nearby particles
                            objectArr.push(gameArr[a+c][b+d][e]); //push all particles into the array that stores all possible collisions
                        }
                    }
                }
            }

            if (objectArr.length > 1) { //check if there is a possibility for a collision, objectArr contains all particles in the 8 surrounding cells
                for (let i = 0; i < objectArr.length; i++) {
                    for (let j = 0; j < objectArr.length; j++) { //check each particle against each other
                        let currentParticle = objectArr[i];
                        let otherParticle = objectArr[j];
                        if (i !== j) { //don't check a particle against itself
                            let distance = Vector.sub(otherParticle.currentPos,currentParticle.currentPos).mag(); //distance from current particle to the other
                            if (distance < particleWidth && distance !== 0) { //check if the particles are colliding and aren't in exactly the same place
                                let differenceVector = Vector.sub(otherParticle.currentPos,currentParticle.currentPos); //get distance from centers
                                let magToSet = (differenceVector.mag() - particleWidth)/2; //calculate how much to move each particle
                                differenceVector.setMag(magToSet); //set the distance-from-center vector's magnitude
                                currentParticle.currentPos = Vector.add(currentParticle.currentPos,differenceVector); //add the changes to each particle
                                otherParticle.currentPos = Vector.sub(otherParticle.currentPos,differenceVector);
                                objectArr[i] = currentParticle; //enter the new values back into the array for both particles
                                objectArr[j] = otherParticle;
                            }
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr[i].length; j++) {
            for (let k = 0; k < gameArr[i][j].length; k++) {
                particleArr[gameArr[i][j][k].id] = gameArr[i][j][k]; //enter every particle back into main array to be drawn and simulated
            }
        }
    }

    let simSpeed = 0.5;

    //run through full list of particles
    for (let i = 0; i < particleArr.length; i++) {
        particleArr[i].updatePos(simSpeed/subSteps);
        if (boundary === 0) {
            particleArr[i].currentPos.limit(radius-particleWidth/2);
        }
        //ctx.fillStyle = particleArr[i].color;
    }
    }

    for (let i = 0; i < particleArr.length; i++) {
        ctx.fillStyle = particleArr[i].color;
        drawCircle(particleArr[i].currentPos.x,particleArr[i].currentPos.y,particleWidth/2,ctx);
    }
    //if (longestWait < 18 && ticks > 1 && currentParticles < particleMax) {
    if (ticks > 3 && particleArr.length < particleMax) {
        //particleArr.push(new Particle(Math.random()*500-250,0));
        let particleNum = particleArr.length;
        particleArr.push(new Particle(-190,-200,particleNum,colorArr6[particleNum]));
        particleArr[particleNum].lastPos = new Vector(-192,-199);
        ticks = 0;
    }

    lastPageX = x;
    lastPageY = y;

    let now = performance.now();
    //console.log(`Call to doSomething took ${now - then} milliseconds`)
    //console.log(longestWait)
    if (now - then > longestWait) {longestWait = now - then;}
}

setInterval(mainLoop,1000/fps);
