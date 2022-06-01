// The environment geometry.
// Manages the meaning of moving in the space and limits to this space.
class Arena {
  constructor(theEngine) {
    this._engine = theEngine;
  }
  
  changePos(b, dPos){
    throw "Not implemented";
  }
  
  draw(){
    throw "Not implemented";
  }
  
  getNeighbours(b, maxDist, bodies) {
    throw "Not implemented";
  }
}

// Normal movement, but when trying to overcome the display limits, space folds onto itself. 
class ToroidalArena extends Arena {
  constructor(theEngine) {
    super(theEngine);
  }  
  
  changePos(b, dPos){
    let newX = b.pos.x + dPos.x;
    let newY = b.pos.y + dPos.y;
          
    b.pos.x = (newX > 0) ? newX % width : width - newX;
    b.pos.y = (newY > 0) ? newY % height : height - newY;
  }
  
   draw(){
    // nop
   }
   
   // It considers walls are folded
   getNeighbours(b, maxDist, bodies) {
      const maxDSq = maxDist * maxDist;
      const neighbours = [];
      bodies.forEach(b2=>{
         if (b2 != b) {
            let dx = min(abs(b2.pos.x - b.pos.x), abs((b2.pos.x+width) - b.pos.x), abs((b2.pos.x-width) - b.pos.x));
            
            let dy = min(abs(b2.pos.y - b.pos.y), abs((b2.pos.y+height) - b.pos.y), abs((b2.pos.y-height) - b.pos.y));   
            
            let dSq = dx*dx+dy*dy;
            if(dSq < maxDSq){
               neighbours.push(b2);
            }
         }
      });
   
      return neighbours;
    }
}


// Normal movement, but when trying to overcome the display limits, some strategies are ised to forbid it. 
class RectArena extends Arena {
  constructor(theEngine) {
    super(theEngine);
  }
  
  changePos(b, dPos){
    b.pos.add(dPos);
    this.enforceWallLimits(b);
  }
  
  
  enforceWallLimits(p) {    
    if (p.pos.x < p.rad) {
      p.pos.x = p.rad;
      p.v.mult(-1 * cfg.wallBounceK, 1-cfg.wallFrictionK);
      //p.f.add(-p.v.x * cfg.wallBounceK, -p.v.y * cfg.wallBounceK/10);
    }
    if (p.pos.x > width - p.rad) {
      p.pos.x = width - p.rad;
      p.v.mult(-1 * cfg.wallBounceK, 1-cfg.wallFrictionK);
    }
    if (p.pos.y < p.rad) {
      p.pos.y = p.rad;
      p.v.mult(1-cfg.wallFrictionK, -1 * cfg.wallBounceK);
    }
    if (p.pos.y > height - p.rad) {
      p.pos.y = height - p.rad;
      p.v.mult(1-cfg.wallFrictionK, -1 * cfg.wallBounceK);
    }
  } 
  
  draw(){
    push();
    stroke(100);
    noFill();
    rectMode(CORNER);
    rect(0,0,width, height);
    pop();
  }

    
  getNeighbours(b, maxDist, bodies) {
    return Util.getNeighbours(bodies, b, maxDist);
  }
  
  
  getNeighboursWithType(b, maxDist, bodies, type) {
    return Util.getNeighboursWithType(bodies, b, maxDist, type);
  }
}
