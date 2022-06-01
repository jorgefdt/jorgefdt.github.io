class Engine {
   constructor() {
     this._arena = cfg.haveWalls ?
       new RectArena(this) :
       new ToroidalArena(this);

     // that respond to dynamics. 
     this._dyns = [];
     
     // that respond to kinematics only, not dyn.
     this._kyns = [];
     
     // Simulables; Support step() and draw(), but no kyn or dyn. 
     this._sims = [];
     
     this._gForce = cfg.gForce;
     this._gForceMag = cfg.gForce.mag();
   }
   
   add(p) { 
     this._dyns.push(p);
     return p;
   }
   
   remove(p) {
     let i = this._dyns.indexOf(p);
     if (i > -1) {
       this._parts.splice(i,1);
     }
   }
   
   get arena() { return this._arena; }
   get gForce() { return this._gForce; }
   
   // === CONSTRUCTORS
   
   newParticle() {
     let p = new Particle(this.arena);
     return this.add(p);
   }
   
   // Unmovable particle, with default color and rad. 
   newAnchor(x, y) {
     let p = new Anchor(this.arena)
        .setPos(x,y);
     return this.add(p);     
   }
   
   newSpring(...args) {
     let p = new Spring(...args);
     this._sims.push(p);
     return p;
   }
   
   newElasticBody() {
     let p = new ElasticBody(this.arena);
     return this.add(p);
   }
   
   
   newCircleBody(x, y, rad) {
     let p = Body.newCircle(x, y, rad, this._arena)
             .setMaxV(0)
     return this.add(p);
   }
   
   
   addBoids(n) {
    this._addThingsWoCollision(n, 
      ()=>new Boid(this._arena));
   }
   
   addPredators(n) {
    this._addThingsWoCollision(n, 
      ()=>new Predator(this._arena));
   }
   
   addPlainAgents(n) {
    this._addThingsWoCollision(n, 
      ()=>new Agent(this._arena));    
   }

  addBodies(n) {
    for (var i = 0; i < n; i++) {
      let pos = new p5.Vector(random(width), random(height));
      let rad = random(10, 50);
      engine.add(
        Body.newCircle(pos.x, pos.y, rad, engine.arena)
        .setMaxV(0)
     );       
    }
  }
  
   _addThingsWoCollision(n, factory) {
    for (var i = 0; i < n; i++) {
      let b = factory();
      let pos = this._randomPosOutsideBodies();
      b.pos.set(pos.x, pos.y);
      this.add(b);
    }
  }
   
  _randomPosOutsideBodies() {
    let pos = null;
    while (pos == null || this.bodyAt(pos)) {
      pos = createVector(random(width), random(height));
    }
    return pos;
  }
  
  
  agentsPosValid() {
    let boidsOk = this.getBoids().every(b=> !this.bodyAt(b.pos));
    let predsOk = this.getPredators().every(b=> !this.bodyAt(b.pos));
    return boidsOk && predsOk;
  }
  

   step() {
     // this._kyns.forEach(p => {      
      this._dyns.forEach(p => {     
        // Apply noise.
        if(deltaTime % 100 == 0){
           p.f.add(random(-cfg.noiseK, cfg.noiseK), random(-cfg.noiseK, cfg.noiseK));
        }
        
        // Apply forces and limit result. 
        p.v.add(this._gForce);
        p.v.add(p.f);
        p.v.limit(p._maxV);
        let mag = p.v.mag();
        if (mag < p._minV) {
          p.v.setMag(p._minV);
        }
  
        p.f.set(0,0);
  
        // Apply friction. 
        p.v.mult(1-cfg.frictionK);
        
        // Update pos by interacting w arena. 
        this._arena.changePos(p, p.v);
        
        p.step();
      });
      
      this._sims.forEach(p => p.step());
      
      dbox.set("#dyns", this._dyns.length);
      dbox.set("#kyns", this._kyns.length);
      dbox.set("#sims", this._sims.length);     
   }
   
   
   forEach(f) {
      this._dyns.forEach(f);
   }
   
   
   draw(){
      this._sims.forEach(p => p.draw());      
      this._dyns.forEach(p => p.draw());
      this._arena.draw();
   }
   
   
   getBoids() {
     return this.getByType("Boid");
   }
  
   getPredators() {
     return this.getByType("Predator");
   }
   
   getBodies() {
     return this.getByType("Body");
   }   
   
   
   getParticles() {
     return this.getByType("Particle");
   }   
   
   getByType(type){
     return this._dyns.filter(b=>b.constructor.name === type);
   }
   
   
   getAvgVelocityWithType(type) {
     return Util.avgVectors(this.getByType(type), b=>b.v);
   }
   
   
   getAvgPositionWithType(type) {
     return Util.avgVectors(this.getByType(type), b=>b.pos);
   }
   
   
   getNeighbours(b, maxDist) {
      return this._arena.getNeighbours(b, maxDist, this._dyns);
   }
   
   
   getNeighboursWithType(b, maxDist, type) {
      return this._arena.getNeighboursWithType(b, maxDist, this._dyns, type);
   }
  
   getNeighboursSameType(b, maxDist) {
      return this._arena.getNeighboursWithType(b, maxDist, this._dyns, b.constructor.name);
   }
   
   
   getNeighboursWithCondition(b, maxDist, condition) {
      return Util.getNeighboursWithCondition(this._dyns, b, maxDist, condition);
   }
   
  getNearestNeighbour(b) {
    return Util.getNearestNeighbour(this._dyns, b);
  }
  
  
  getNearestNeighbourWithCondition(b, condition) {
     return Util.getNearestNeighbourWithCondition(this._dyns, b, condition);
  }
  
  getNearestNeighbourWithType(b, type) {
    return Util.getNearestNeighbourWithType(this._dyns, b, type);
  }
  
  getThingAt(xOrPos, yOrNothing) {
    let t;
    if (yOrNothing !== undefined) {
      t = this._dyns.find(b=> b.contains(xOrPos, yOrNothing));
    } else {
      t = this._dyns.find(b => b.contains(xOrPos));
    }
    return t || null;
  }

  
  bodyAt(pos) {
    return this.getBodyAtOrNull(pos) != null;
  }
  
  
  getBodyAtOrNull(pos) {  
    let body = this._dyns.find(b=>
      b.constructor.name === "Body" && b.contains(pos)
    );
    return body || null;
  }
  
  getBodyIntersectingThingOrNull(thing) {  
    let body = this._dyns.find(b=>
      b.constructor.name === "Body" && b.ballIntersects(thing)
    );
    return body || null;
  }
}