var particleWidth = 20;
var gravity = 1;

class Particle {
    constructor (x,y,id,setColor) {
        this.currentPos = new Vector(x,y);
        this.lastPos = new Vector(x,y);
        this.acc = new Vector(0,gravity);
        this.color = "white";
        if (setColor !== undefined) {
            this.color = setColor;
        }
        this.id = id;
    }

    updatePos(dt) {
        let vel = Vector.sub(this.currentPos,this.lastPos);
        this.lastPos = this.currentPos.copy();
        this.currentPos.add(vel);
        this.currentPos.add(Vector.mult(this.acc,(dt**2),(dt**2)));
    }

    changePos(offsetVector) {
        this.currentPos = Vector.add(this.currentPos,offsetVector)
    }
}