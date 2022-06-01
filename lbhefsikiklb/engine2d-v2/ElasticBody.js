// A composite of other Things, managed internally.
class ElasticBody extends Thing {
  constructor(arena){
    super(arena);

    this.pos.set(0,0);
    this.v.set(0,0);
    this._width = 150;
    this._height = 100;
    this._springK = cfg.springK;
    this._springDampingK = cfg.springDampingK;
     
    this._parts = []; // The parts of this body. 
    this._springs = []; // The springs of this body. 
    this._createStructure();
    
    this.setRad(5);
  } 
   
   
  _createStructure() {
    const nHor = 5, nVer = nHor;    
    this._parts = [];
    this._springs = [];
    
    const left = this._pos.x - this._width/2;
    const top  = this._pos.y - this._height/2;

    // Create parts and springs.
    const dx = this._width / nHor,
          dy = this._height / nVer; 
    let prj = null;
    for (let i = 0; i <= nHor; i++) {
      const x = left + dx * i;
      const rj = [];
      for (let j = 0; j <= nVer; j++) {
        const y = top + dy * j;
        const p = this.point(x, y);
        p.setColor(((i+j)%2==0) ? color('yellow') : color('red'));
        rj.push(p);
       
        if (j > 0) { // Vertical
          this.spring(rj[j-1], rj[j]);
        }
        
        if (prj != null) {
          // Horizontal
          this.spring(prj[j], rj[j]);
          
          // Diagonal
          if (j > 0) {
            this.spring(prj[j-1], rj[j]); // orientation: \
          }
          if (j < nVer) {
            this.spring(prj[j+1], rj[j]); // orientation: /
          }
        } // if
      } // for j
      prj = rj;
    } // for i
  }
  
  
  // override
  // Forward relative pos change to parts. 
  setPos(xOrPos, yOrNothing){
    this._propagateVectorProperty("_pos", xOrPos, yOrNothing);
    return super.setPos(xOrPos, yOrNothing);
  }
  
  setV(xOrPos, yOrNothing){
    this._propagateVectorProperty("_v", xOrPos, yOrNothing);
    return super.setV(xOrPos, yOrNothing);
  }
  
  setColor(newValue){
    this._propagateProperty("_color", newValue);
    return super.setColor(newValue);
  }
  
  setSpringK(newValue) {
    this._springK = newValue;
    this._springs.forEach(s => s._springK = newValue);    
    return this;
  }
  
  setSpringDampingK(newValue) {
    this._springDampingK = newValue;
    this._springs.forEach(s => s._springDampingK = newValue);   
    return this;
  }
  
  _propagateVectorProperty(propertyName, xOrPos, yOrNothing){    
    let delta;
    if (yOrNothing !== undefined) { // xOrPos is x coord. 
      delta = createVector(xOrPos, yOrNothing).sub(this[propertyName]);
    } else { // xOrPos is vector
      delta = p5.Vector.sub(xOrPos, this[propertyName]);
    }
    this._parts.forEach(p => p[propertyName].add(delta));
  }
  
  
  _propagateProperty(propertyName, newValue) {    
    this._parts.forEach(p => p[propertyName] = newValue);
  }

  
  point(x,y) {
    const p = engine.newParticle()
      .setRad(2).setPos(x, y);
    this._parts.push(p);
    return p;
  }

  
  spring(p1, p2) {
    const s = engine.newSpring(p1, p2, this._springK, this._springDampingK);
    this._springs.push(s);
    return s;
  }


  step() {
    super.step();
  }
  
  
  drawAgentOnly(){    
    // Center
    // noStroke();
    // fill(0, 255, 10, 70);
    // circle(this.pos.x, this.pos.y, this.rad*3);
  }
}
