// Temp file, containing most of the classes.
// To be partitioned into individual files and moved to its own dir.
class Geometry {
  constructor(){}
  get aabb() { return null; }
  draw(){}
  intersectsShape(s) { return false; }
}


// Axis Aligned Bounding Box
class AABB extends Geometry {
    constructor(minX, minY, maxX, maxY) {
      super();
      this.minX = minX;
      this.minY = minY;
      this.maxX = maxX;
      this.maxY = maxY;
    }
    
    set(minX, minY, maxX, maxY) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    get aabb() {return this;}
    get width() {return this.maxX - this.minX + 1;}
    get height() {return this.maxY - this.minY + 1;}
    get centerX() {return (this.minX + this.maxX)/2;}
    get centerY() {return (this.minY + this.maxY)/2;}
    
    static intersectAABB(a, b) {
        // Exit with no intersection if found separated along an axis
        if (a.maxX < b.minX || a.minX > b.maxX ||
            a.maxY < b.minY || a.minY > b.maxY) {
            return false
        } else {
            // No separating axis found, therefor there is at least one overlapping axis
            return true
        }
    }

    intersects(b) {
        return AABB.intersectAABB(this, b);
    }
    
    
    static calcPenetration(a, b) {
        // Exit with no intersection if found separated along an axis
        // > 0: has penetration.
        let abHPen = a.maxX - b.minX;
        let baHPen = b.maxX - a.minX;
        let abVPen = a.maxY - b.minY;
        let baVPen = b.maxY - a.minY;
        
        let hPen = min(abHPen, baHPen);
        let vPen = min(abVPen, baVPen);
        if (abHPen >= 0 && baHPen >= 0 && 
            abVPen >= 0 && baVPen >= 0) {
          return {hPen: hPen, vPen: vPen, abHPen: abHPen, baHPen: baHPen, abVPen: abVPen, baVPen: baVPen};
        } else {
          return false;
        }
    }
    
    
    draw(strokeColor, fillColor) {
      strokeColor = strokeColor || color(255);
      if (fillColor) {
        fill(fillColor);
      } else {
        noFill();
      }
      stroke(strokeColor);
      rect(this.minX, this.minY, this.width, this.height);
    }
}


class Circle extends Geometry {
    constructor(pos, radius) {
      super();
      this.pos = pos;
      this.radius = radius;
    }

    static intersectCircle(c1, c2) {
        let dr = c1.radius + c2.radius;
        dr *= dr;
        return dr < (c1.x + c2.x) ^ 2 + (c1.y + c2.y) ^ 2;
    }

    intersects(c2) {
        return Circle.intersect(this, c2);
    }
}


class Material {
  get density() {}
}


class Body {
    constructor(mass) {
        // Positional data
        this._pos = createVector(0,0); // of center of mass
        this._v = createVector(0,0);
        this._f = createVector(0,0);
        
        this._mass = mass;
        this._inverseMass = 1 / this._mass;
        this._restitutionK = 1;
        
        // Spatial data
        // geometry?
        this.setSize(20,10);
        
        this._color = color(255);
        this._collisionFlagged = false;
        
        this._orientation = 0; // Radians, [0, 2 pi]
        this._angVelocity = 0; // w, radians/sec
        this._angAcceleration = 0;
        this._torque = 0;
        this._momenyInertia = 0;
        /*
        2d rectangle: I = m * (width^2 + height^2)/12
        torque = rx * fy - ry * fx
        
        */
        
    }
    
    get aabb() { return this._aabb; }
    get pos() { return this._pos; }
    get v() { return this._v; }    
    get f() { return this._f; }
    get mass() { return this._mass; }
    get inverseMass() { return this._inverseMass; }
    get restitutionK() { return this._restitutionK; }
    
    flagCollision() {
      this._collisionFlagged = true;
    }
    
    clearCollisionFlag() {
      this._collisionFlagged = false;
    }
    
    setPos(x,y) {
      this._pos.set(x,y);
      this.updateAABB();     
      return this;
    }
    
    setV(x,y) {
      this._v.set(x,y);
      return this;
    }
    
    setSize(width, height) {
      this._width = width;
      this._height = height;
      this._halfWidth = this._width/2;
      this._halfHeight = this._height/2;        
      this._aabb = null;
      this.updateAABB();
        
      return this;
    }
    
    setColor(aColor) {
      this._color = aColor;
      return this;
    }
    
    updateAABB() {
      let minX = this._pos.x - this._halfWidth;
      let minY = this._pos.y - this._halfHeight;
      let maxX = this._pos.x + this._halfWidth;
      let maxY = this._pos.y + this._halfHeight;
      
      if (this._aabb == null) {
        this._aabb = new AABB(minX, minY, maxX, maxY);        
      } else {
        this._aabb.set(minX, minY, maxX, maxY);
      }
    }
    
    draw() {
      // Color change on collision might be useful sometimes but it looks flickery.
      //this._aabb.draw(this._collisionFlagged ? color(255,0,0) : this._color);
      this._aabb.draw(this._color);
    }
}


class Engine2 {
  constructor() {
    this._bodies = [];
    this._time = 0;
    this._gForce = cfg.gForce.copy();
    this._collisionDetector = new CollisionDetector();
    this._collisionSolver = new CollisionSolver();
  }
  
  get gForce() { return this._gForce; }

  add(body) {
    this._bodies.push(body);
  }
    
  // @dt seconds
  step(dt) {
    // Positional logic
    dbox.set("engine.dt", dt.toFixed(4));
    dbox.set("engine.time", this._time.toFixed(2));
    
    this._bodies.forEach(b=>this._stepBody(b,dt));
    this._time += dt;
    
    // Collision detection
    this._bodies.forEach(b=>this._resolveBoundaries(b));
    let collisions = this._collisionDetector.detectAllVsAll(this._bodies);
    
    // Collision resolution
    if (collisions) {        
      this._collisionSolver.solveAABB(collisions);
    }
  }
  
  
  bodyCollides(b) {
    let collisions = this._collisionDetector.detectOneVsAll(b, this._bodies);
    return collisions.length > 0;
  }
  
  
  _resolveBoundaries(body) {
    let b = body.aabb;
    if(b.minX < 0 || b.maxX > width) {
      body.v.x *= -1;
    }
    if(b.minY < 0 || b.maxY > height) {
      body.v.y *= -1;
    }    
  }
  
  /*
   Integrators:
   - Explicit Euler (1st order)
      p += v * dt
      v += acc * dt
   - Semi-implicit Euler (1st order; symplectic)
      v += acc * dt
      p += v * dt
   - Implicit Euler
   - Verlet (2nd order; symplectic)
   - RK4 (Runge-Kutta; 4th order)
  */
  _stepBody(b, dt) {
    b.v.add(p5.Vector.mult(this._gForce, dt));
    b.v.add(p5.Vector.mult(b.f, dt*b.inverseMass));
    b.pos.add(p5.Vector.mult(b.v, dt));
    
    b.f.set(0,0);
    b.updateAABB(); 
  }
  
  draw() {
    this._bodies.forEach(b=>b.draw());
  }
}


class CollisionDetector {
  detectPair(b1, b2) {
    let pen = AABB.calcPenetration(b1.aabb, b2.aabb);
    if (pen) {
      b1.flagCollision();
      b2.flagCollision();
    }
    return pen ? {b1: b1, b2: b2, penetration: pen} : null;
  }

  
  detectOneVsAll(one, bodies) {
    bodies.forEach(b=>b.clearCollisionFlag());
    one.clearCollisionFlag();
    
    let collisions = [];
    bodies.forEach(b=>{
      if (b != one) {
        let col = this.detectPair(one, b);
        if (col) {
          collisions.push(col);
        }       
      }
    });
    
    return collisions;
  }
  
  
  detectAllVsAll(bodies) {
    bodies.forEach(b=>b.clearCollisionFlag());
    let collisions = [];
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i+1; j < bodies.length; j++) {
        let col = this.detectPair(bodies[i], bodies[j]);
        if (col) {
          collisions.push(col);
        }       
      } // j
    } // i
    return collisions;
  }
}


class CollisionSolver {
  solveAABB(collisions) {
    collisions.forEach(c=> {
      let j = (c.b1.mass * c.b2.mass)/(c.b1.mass + c.b2.mass);

      if (c.penetration.hPen < c.penetration.vPen) { // horizontal bounce        
        c.b1.v.mult(-1 * j/c.b1.mass, 1);
        c.b2.v.mult(-1 * j/c.b2.mass, 1);
        
        let pen, left, right;
        if (c.penetration.abHPen < c.penetration.baHPen) {
          pen = c.penetration.abHPen;          
          left = c.b1;
          right = c.b2;
        } else {
          pen = c.penetration.baHPen;          
          left = c.b2;
          right = c.b1;
        }

        left.pos.sub(pen/2 * j/left.mass +1, 0);
        right.pos.add(pen/2 * j/right.mass +1, 0);
      } else { // vertical bounce
        c.b1.v.mult(1, -1 * j/c.b1.mass);
        c.b2.v.mult(1, -1 * j/c.b2.mass);
        
        let pen, up, down;
        if (c.penetration.abVPen < c.penetration.baVPen) {
          pen = c.penetration.abVPen;          
          up = c.b1;
          down = c.b2;
        } else {
          pen = c.penetration.baVPen;          
          up = c.b2;
          down = c.b1;
        }
        
        up.pos.sub(0, pen/2 * j/up.mass+1);
        down.pos.add(0, pen/2 * j/down.mass+1);        
      }   
    });
  }
  

  solveCircle(a, b) {
    // v = v0 * e
    // Vab dot n = -e * (b.v - a.v) dot n
    // I = impulse = mass * v
    // Vab = v0 + j * n / mass
    // Va1 = Va0 + j * n * massA
    let dv = p5.Vector.sub(b.v, a.v);

    // Calculate relative velocity in terms of the normal direction
    let velAlongNormal = DotProduct(dv, normal);

    // Do not resolve if velocities are separating
    if (velAlongNormal > 0)
        return;

    // Calculate restitution
    let e = min(a.restitutionK, b.restitutionK);

    // Calculate impulse scalar
    let j = -(1 + e) * velAlongNormal;
    j /= 1 / A.mass + 1 / B.mass;

    // Apply impulse
    let impulse = j * normal;
    a.v -= 1 / a.mass * impulse;
    b.v += 1 / b.mass * impulse;
  }
}





