const cfg1 = {
  // Sizes
  nBodies: 40,

  // Sim Details
  maxV: 8,
  minV: 0.1,
  defaultRad: 2,
  bodyRejectK: 0.3,

  wallBounceK: 0.9, // 0-1
  wallFrictionK: 0.001,
  frictionK: 0,//.01,//0.001,//0.01,//0.02, // 0-1
  noiseK: 0.0,//0.1,

  fieldCols: 10,
  haveWalls: true,

  //gForceK: 0.01,
  //gForce: new p5.Vector(0, 9.81 * 0.01),

  gForceK: 0,// 1,
  gForce: new p5.Vector(0, 0),
  
  springK: 0.01,
  springDampingK: 1,

  // Display
  drawForces: false,
  fpsSmoothingK: 0.2,
  drawAverages: false,

  // Screen
  screen: { width: 400, height: 300 } // Updated in setup()
};

const cfg = cfg1;
let engine;
let dbox;
let fpsSmoother;

function setup() {
  cfg.screen.width = min(screen.width - 20, window.innerWidth - 15);
  cfg.screen.height = min(screen.height - 200, window.innerHeight - 15);
  createCanvas(cfg.screen.width, cfg.screen.height);
  
  dbox = new DebugBox();
  engine = new Engine2();
  fpsSmoother = new ExponentialSmoother(cfg.fpsSmoothingK);
  
  demoManyBodies();
  //demoFrontalCollision();  
}


function draw() {
  // ==== update
  let dt = 0.05;//deltaTime / 1000; // ms to seconds
  let start = millis();
  engine.step(dt);
  dbox.set("step ms", (millis() - start).toFixed(2));  
   
  // ==== draw
  start = millis();
  background(20);
  engine.draw();
  dbox.set("draw ms", (millis() - start).toFixed(2));  
  
  // ==== Inspections
  const fps = frameRate();
  dbox.set("fps", round(fpsSmoother.update(fps)));
  dbox.set("deltaTime", deltaTime.toFixed(1));  
  dbox.draw();  
}


function demoManyBodies() {
  let nBodies = 150;
  let maxV = 10;
  for(let i=0; i<nBodies; i++) {
    let side = random(1, 50);
    let mass = side*side;
    let b1 = new Body(mass)
      .setSize(side, side)
      .setPos(random(100, width-100), 50+i * height/nBodies)
      .setV(random(-maxV, maxV), random(-maxV, maxV));
      
    if (!engine.bodyCollides(b1)) {
      engine.add(b1);
    }
  }  
}


function demoFrontalCollision() {
  let b1 = new Body(1).setSize(70, 50)
    .setPos(width/3, height/2).setV(5, 0);
  engine.add(b1);
  
  let b2 = new Body(1).setSize(70, 50)
    .setPos(width*2/3, height/2).setV(-5, 0);
    engine.add(b2);
}



function v(vec) {
  return "[" + vec.x.toFixed(1) + ", " + vec.y.toFixed(1) + "]";
}
