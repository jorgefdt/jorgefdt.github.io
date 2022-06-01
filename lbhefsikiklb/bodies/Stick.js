class Stick {
   constructor(x, y, len) {
     this.pos = createVector(x, y);
     this.len = len;
     this.angle = 0;
     this.angularVel = 0;
     this.torque = radians(0);
     
     this.flexK = 0.01; //0.003;
     this.dampK = 0.999;//0.97;
     this.minAngle = -PI/2;
     this.maxAngle = PI/2;
   }
   
   
   applyForce(force) {
     // assumes distance from CM
     let dist = this.len;
     this.torque += force * dist;
   }
   
   
   step(dt) {
     dt = dt || 1;
     this.torque += -this.flexK * this.angle;
     
     this.angularVel += this.torque * dt;     
     this.angle += this.angularVel * dt;
     this.torque = 0;
     
     this.angularVel *= this.dampK;
     
     if (this.angle < this.minAngle) {
       this.angle = this.minAngle;
       this.angularVel = 0;
     }
     if (this.angle > this.maxAngle) {
       this.angle = this.maxAngle;
       this.angularVel = 0;
     }
   }
   
   
   draw() {
     push();

     translate(this.pos.x, this.pos.y);
     stroke(255, 200);
     text(this.angle.toFixed(2), 10, 0);
     rotate(this.angle);
     stroke(255, 100);
     fill(255);
     circle(0, 0, this.len/20);
     line(0, 0, 0, this.len);

     translate(0, this.len);
     noStroke();
     fill(255, 0, 0);
     circle(0, 0, this.len/10);

     pop();
   }
} // Stick
