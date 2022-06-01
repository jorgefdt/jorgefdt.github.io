// Thing subject to the simulation rules.
class Particle extends Thing {
  constructor(arena){
    super(arena);
    this.setColor(color(255, 200));
    this.setRad(5);
  }
   

  step() {
    super.step();
    this.bounceFromBodies();
  }
  
  
  bounceFromBodies() {
    // TODO Not considering particle radious.
    //let aBody = engine.getBodyAtOrNull(this.pos);
    let aBody = engine.getBodyIntersectingThingOrNull(this);
    if(aBody != null) {
      // Bounce force in direction of normal.
      // TODO Both considered circular.
      let normal = p5.Vector.sub(this.pos, aBody.pos);
      let dist = normal.mag();
      let penetrationDist = aBody.rad - dist;
      normal.normalize();

      // Intensity depends on relative velocities.
      // Also, add component based on penetration distance, for when velocity is 0.
      let normalV = p5.Vector.sub(this.v, aBody.v);
      normal.mult(normalV.mag() * 1.9 + penetrationDist * 0.1);
      this.push(normal);
    }  
  }
  
  
  drawAgentOnly(){
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.rad*2);
  }
}
