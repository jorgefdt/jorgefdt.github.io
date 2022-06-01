// Manages elastic between 2 particles. 
class Spring extends Simulable {
  constructor(p1, p2, springK, springDampingK) {
    super();
    this._springK = springK;
    this._springDampingK = springDampingK;    
    this._p1 = p1;
    this._p2 = p2;
    this._atRestDist = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
  }
  
  
  step() {
    let vDist = p5.Vector.sub(this._p2.pos, this._p1.pos);
    let dist = vDist.mag();

    if (dist > 0) {
      // == Calc stretching force: F = -k * stretch
      let vDistN = vDist.div(dist);
      
      // Stretch because of gForce.
      // TODO something wrong here. Why considering gForce? Shouldnt be independent of it?
      let eqStretch = engine._gForceMag / this._springK;
      let stretch = dist - this._atRestDist - eqStretch;
      let vStretchF = p5.Vector.mult(vDistN, -this._springK * stretch);
         
      // == Add dampening.
      // Not working. disabled until fixed.
      let enableDampening = true;
      if (enableDampening) {
        let vDeltaV = p5.Vector.sub(this._p2.v, this._p1.v);
        
        // Project vDeltaV on vDistN. 
        vDeltaV = p5.Vector.mult(vDistN, vDeltaV.dot(vDistN));
        vDeltaV.mult(-this._springDampingK);
        vStretchF.add(vDeltaV);        
      }
      
      // Apply forces.
      this._p2.push(vStretchF);
      this._p1.push(vStretchF.mult(-1));
    }
  }
  
  
  // equilibrium point: g/k=d
 
  draw() {
    const use2Colors = false;
    const elongatedColor = color(0, 0, 255, 150);
    const contractedColor = color(100, 100);

    let vDist = p5.Vector.sub(this._p2.pos, this._p1.pos);
    let dist = vDist.mag();
    
    /*
    vDist.normalize();
    
    // Marker original at rest
    let vRest = p5.Vector.mult(vDist, this._atRestDist);
    fill(0, 200, 200);
    noStroke();
    circle(this._p1.pos.x + vRest.x, this._p1.pos.y + vRest.y, 5);
    
    let eqStretch = cfg.gyForce / this._springK;
    //dbox.set("eqStretch", eqStretch.toFixed(1));  
   
    // Marker at rest + initial deformation
    let vRest2 = p5.Vector.mult(vDist, this._atRestDist + eqStretch);
    fill(200, 200, 0);
    noStroke();
    circle(this._p1.pos.x + vRest2.x, this._p1.pos.y + vRest2.y, 5);
    
    fill(100);
    noStroke();
    circle(this._p1.pos.x + vDist.x, this._p1.pos.y + vDist.y, 5);
*/

    const theColor = (!use2Colors || dist <= this._atRestDist) ? contractedColor : elongatedColor;
    noFill();
    stroke(theColor);
    line(this._p1.pos.x, this._p1.pos.y, this._p2.pos.x, this._p2.pos.y); 
  }
}


