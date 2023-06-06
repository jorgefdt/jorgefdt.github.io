class Cell {
  constructor(x, y, cellSize) {
    // Configure how much disalignment. 
    let k = 0.3;// in [0, 0.5)
    let spacing = 0.5;
    this.cellSize = cellSize;
    
    this.pos = createVector(
      x + random(-cellSize * k, cellSize * k),
      y + random(-cellSize * k, cellSize * k));
    this.len = 150;
    this.thickness = cellSize * spacing;
    this.flow = p5.Vector.fromAngle(0, 1); // in [-1, 1]^2
  }
  
  
  setFlow(fx01, fy01) {
    this.flow.set(map(fx01,0,1,-1,1), map(fy01,0,1,-1,1));    
  }
  
  step() {
  }
   
  draw() {
    this.drawFlexFlow();
    //this.drawBoxyFlow();
  }
   
  drawBoxyFlow() {
    push();
    
    let bodyColor = this.makeFlowColor();
    
    stroke(bodyColor);
    fill(bodyColor);
    
    let height = this.flow.x * this.cellSize * 50 ;
    
    translate(this.pos.x, this.pos.y, height/2);
    
    box(this.thickness, this.thickness, height);
    pop();   
  }
  
  drawFlexFlow(){
    let mag01 = (abs(this.flow.x) + abs(this.flow.y))/2; // optimization instead of mag()
    let tipX = this.flow.x * this.len;
    let tipY = this.flow.y * this.len;
    
    push();
    let bodyColor = this.makeFlowColor();
    translate(this.pos.x, this.pos.y, 0);
    stroke(bodyColor);
    
    // === 3D
    let xAng = PI/2 - acos(this.flow.x);
    let yAng = PI/2 - acos(this.flow.y);
    rotateX(xAng);
    rotateY(yAng);
    translate(0, 0, this.len/2);
    
    fill(bodyColor);
    strokeWeight(0.5);
    box(this.thickness, this.thickness, this.len);
    pop();   
  }


  makeFlowColor() {
    let optimized = false;
    let maxRG = 255;
    
    let mag = (abs(this.flow.x) + abs(this.flow.y))/2; // optimization instead of mag()
    let r, g;
    if (this.optimized) {
      // Approximate sin() with a saw-tooth. 
      let fxAbs = abs(this.flow.x);
      let fyAbs = abs(this.flow.y);
      r = fxAbs < 0.5 ? map(fxAbs, 0, 0.5, 0, 255) : map(fxAbs, 0.5, 1, 255, 0);
      g = fyAbs < 0.5 ? map(fyAbs, 0, 0.5, 0, 255) : map(fyAbs, 0.5, 1, 255, 0);
    } else {
      r = constrain(abs(sin(this.flow.x*PI)) * maxRG, 0, 255);
      g = constrain(abs(sin(this.flow.y*PI)) * maxRG, 0, 255);
    }
    
    let b = map(mag, 0, 1, 30, 160);
    let alpha = map(mag, 0, 1, 160, 255);
    
    return color(r, g, b, alpha);
  }
}
