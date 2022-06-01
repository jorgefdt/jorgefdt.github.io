// Thing subject to the simulation rules.
class Thing {
   constructor(arena){
      // simulable properties
      this._arena = arena;
      this._rad = cfg.defaultRad;
      this._pos = new p5.Vector(random(width), random(height));
      this._v = new p5.Vector();
      this._maxV = cfg.maxV;
      this._minV = cfg.minV;
      this._f = new p5.Vector(0, 0);
      
      // visual peoperties
      this._color = color(255);
   }
   
   setColor(newValue){
     this._color = newValue;
     return this;
   }
   
   setRad(newValue){
     this._rad = newValue;
     return this;
   }
   
   setMaxV(newValue){
     this._maxV = newValue;
     return this;
   }
   
   setPos(xOrPos, yOrNothing){
     Util.setVector(this._pos, xOrPos, yOrNothing);
     return this;
   }  
   
   setV(xOrPos, yOrNothing){
     Util.setVector(this._v, xOrPos, yOrNothing);
     return this;
   }
   
   get rad(){ return this._rad;}
   get pos(){ return this._pos;}
   get color() {return this._color;}
   get v(){ return this._v;} 
   get f(){ return this._f;} 
   get minX(){ return this._pos.x - this._rad; }
   get maxX(){ return this._pos.x + this._rad; }
   get minY(){ return this._pos.y - this._rad; }
   get maxY(){ return this._pos.y + this._rad; }
   get maxV(){ return this._maxV; }
  
   contains(aPos) {    
     return aPos.x >= this.minX &&
     aPos.x <= this.maxX &&
     aPos.y >= this.minY &&
     aPos.y <= this.maxY;
   }
   
   
   ballIntersects(particle) {
     return this._pos.dist(particle.pos) <= (this.rad + particle.rad);
   }   
   
   step() {
      // no-op
   }
   
   
   applyForce(fx, fy) {
      this.f.add(fx, fy);
   }
   
   
   push(forceOrFx, fy) {
     if (fy) {
       this.f.add(forceOrFx, fy);
     } else {
       this.f.add(forceOrFx);
     }
   }
   
   
   // do not override
   draw() {
      // draw velocity
      // this.drawMyVector(this.v.x, this.v.y, 10, color('#ff00ff'));
      
      // this.drawNeighbours(); 
      
      this.drawAgentOnly();
    }
    
   
   // overridable
   drawAgentOnly(){
     // not implemented
   }
   
   
   // ======= UTILITIES
   
   // Draw the neighbours that influence this. 
   drawInfluencers(neighbours, radius, color) {
      const drawLines = true;
      const drawCircle = true;
      
      noFill();
      color.setAlpha(50);
      stroke(color);

      if(drawLines) {
        neighbours.forEach(b2=>{
          line(this._pos.x, this._pos.y, b2._pos.x, b2._pos.y);
        });
      }
      
      if(drawCircle) {
        circle(this._pos.x, this._pos.y, radius*2);
      }
   }

   
   drawNeighbours(radius){
      const neighbours = engine.getNeighbours(this, radius);
      this.drawInfluence(neighbours, radius, color('green'));
   }
   
   
   drawMyVector(dx, dy, multiplier, color){
      push();
      stroke(color);
      translate(this._pos);
      line(0, 0, dx*multiplier, dy*multiplier);
      pop();
   }
   
   
   
}
