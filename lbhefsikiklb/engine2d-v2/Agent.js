// Self propelled thing.
// Methods here should mainly inplement
// self decided behaviour, not environment
// laws.
class Agent extends Thing {
   constructor(arena){
      super(arena);
      this._isDead = false;
      this.randomV(0.2, this._maxV);
      this._birthMillis = millis();
   }
   
   get isDead(){ return this._isDead;}
   
   step(){
      this.avoidBodies();
      this.avoidWalls(this);
      super.step();
   }
   
  
   avoidBodies(){
     // look ahead. if part of a body, deviate. 
     // calc 2 points ahead, left and right. 
     let lookaheadPixels = 20;
     let lookaheadWidth = 5;
     
     // Calc relative positions. 
     let la = createVector(this.v.x, this.v.y).setMag(lookaheadPixels);
     let offRight = createVector(-la.y, la.x).setMag(lookaheadWidth);
     let offLeft = createVector(la.y, -la.x).setMag(lookaheadWidth);
    
     // Calc absolute positions
     la.add(this.pos);     
     let laLeft = p5.Vector.add(la, offLeft);
     let laRight = p5.Vector.add(la, offRight);
     
     // Evaluate bodies ahead. 
     let bodyAtLeft = engine.bodyAt(laLeft);
     let bodyAtRight = engine.bodyAt(laRight);
     
     // If detected a body, steer away from it.
     if (bodyAtLeft && !bodyAtRight) {
      this.push(offRight.x * cfg.bodyRejectK, 
                offRight.y * cfg.bodyRejectK);
     } else if (bodyAtRight && !bodyAtLeft) {
      this.push(offLeft.x * cfg.bodyRejectK, 
                offLeft.y * cfg.bodyRejectK);
     } else if (bodyAtRight && bodyAtLeft) {
      //this.push(this.v.x*k, this.v.y*k);
      this.v.mult(-1);
     } 
     
     // debug
     const showBodySensors = false;
     if (showBodySensors) {
       push();
       noStroke();
       fill(bodyAtLeft ? "red" : 100);
       circle(laLeft.x, laLeft.y, 5);
       fill(bodyAtRight ? "red" : 100);    
       circle(laRight.x, laRight.y, 5);    
       pop();       
     }  
   }
   
   
  avoidWalls(p) {
    let k = 2; // force constant
    let activeBandR = 1/6; // width proportion where wall forces are active. 
    
    // Calc distances to each wall. 
    let dx = p.pos.x < width/2 ? p.minX : p.maxX - width;
    let dy = p.pos.y < height/2 ? p.minY : p.maxY - height;
    let fx=0, fy=0;
    
    // in zone?
    if (abs(dx) < width * activeBandR && dx != 0) {
      fx = k/dx;
    }
    if (abs(dy) < height * activeBandR && dy != 0) {
      fy = k/dy;
    }
    
    // if some force component, apply it. 
    if (fx != 0 || fy != 0) {
      p.applyForce(fx, fy);
    }
  }   
   
  
   randomV(maxDimValue) {
     this.randomV(-maxDimValue, maxDimValue);
   }
   
   // Random components will be in 
   //  [-maxDimValue, -minDimValue] U [minDimValue, maxDimValue]
   randomV(minDimValue, maxDimValue) {
     const mi = abs(minDimValue);
     const ma = abs(maxDimValue);
     

     let rx = random() < 0.5 ? random(-ma, -mi): random(mi, ma);
     let ry = random() < 0.5 ? random(-ma, -mi): random(mi, ma);
     this._v.set(rx, ry);
   }
   
   
   die(){  
    this._isDead = true;
    this.v.set(0,0);
    this._maxV = 0;
   }
   
   
   drawAgentOnly(){
     // not implemented
     /*
     let rad = this._rad;
     if (this._isDead){
        push();     
        stroke(color(102,0,255));
        translate(this._pos.x, this._pos.y);
        strokeWeight(this._rad/2);
        line(-rad, 0, rad, 0);
        line(0, -rad, 0, rad);
        pop();
     } else {
        fill(color(51,51,255));
        noStroke();
        circle(this._pos.x, this._pos.y, rad*2); 
     }
     */
   }
}
