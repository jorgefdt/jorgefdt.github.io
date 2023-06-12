const cfg1 = {
  // Sizes
  nBodies: 2,

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

  gForceK: 0.01,
  gForce: new p5.Vector(0, 0.1),

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
let dBox;
let fpsSmoother;


function setup() {
  cfg.screen.width = min(screen.width - 20, window.innerWidth - 15);
  cfg.screen.height = min(screen.height - 200, window.innerHeight - 15);
  createCanvas(cfg.screen.width, cfg.screen.height);

  dbox = new DebugBox();
  engine = new Engine();
  fpsSmoother = new ExponentialSmoother(cfg.fpsSmoothingK);

  // engine.addBodies(cfg.nBodies);
  engine.newCircleBody(60, height * 0.6, 30);

  demoElasticBody();
  demoSprings();
  demoParticles();
  //testMyBaseInterface();
}


function draw() {
  // ==== draw
  background(20);
  engine.draw();

  // ==== Inspections
  const fps = frameRate();
  dbox.set("fps", round(fpsSmoother.update(fps)));

  // Draw slow calcs around once a second.
  if (frameCount % round(fps) == 0) {
    dbox.set("#p", engine.getParticles().length);
  }
  dbox.draw();

  // ==== update
  engine.step();
}


function testMyBaseInterface() {
  for (let i of [new GoodSimulable(), new BadSimulable()]) {
    i.step();
    i.draw();
  }
}


function demoElasticBody() {
  engine.newElasticBody().setPos(width / 3, 70).setV(0, 0)
    .setSpringK(0.4) // 0.01 normal
    .setSpringDampingK(0.001);

  // engine.newElasticBody().setPos(width*0.6, 70).setV(0, 0)
  //   .setSpringK(0.4) // 0.01 normal
  //   .setSpringDampingK(0.01);  
}


function demoSprings() {
  // Ball from spring, damped.
  // const a = engine.newAnchor(width*0.8, 0);
  // const b = engine.newParticle().setRad(10).setPos(a.pos.x, 150).setColor(color("red"));
  // engine.newSpring(a, b, 0.005, 0.9);
  // b.pos.y = 0;  

  // Ball from spring, not damped.
  const a3 = engine.newAnchor(width * 0.7, 0);
  const b3 = engine.newParticle().setRad(10).setPos(a3.pos.x, 300).setColor(color("red"));
  engine.newSpring(a3, b3, 0.005, 0.001);
  b3.pos.y = 0;

  // Pendulum with stiff elastic, damped.
  // TODO high damping has weird behaviours...
  const a1 = engine.newAnchor(width * 0.3, 0);
  const b1 = engine.newParticle().setRad(20).setPos(a1.pos.x + 50, 50).setColor(color("red"));
  engine.newSpring(a1, b1, 0.9, 0.1);

  // Pendulum with soft elastic, damped.
  const a2 = engine.newAnchor(width * 0.2, 0);
  const b2 = engine.newParticle().setRad(20).setPos(a2.pos.x + 100, 200).setColor(color("red"));
  engine.newSpring(a2, b2, 0.01, 0.1);

  // Double pendulum
  const a4 = engine.newAnchor(width * 0.5, 0);
  const b41 = engine.newParticle().setRad(20).setPos(a4.pos.x + 100, 100).setColor(color(200, 200, 0));
  const b42 = engine.newParticle().setRad(20).setPos(a4.pos.x + 100, 200).setColor(color(200, 200, 0));
  engine.newSpring(a4, b41, 0.01, 0.1);
  engine.newSpring(b41, b42, 0.01, 0.1);

  // Rotating pair
  const a5 = engine.newParticle().setRad(8).setPos(width / 2 - 20, height / 2).setColor(color(0, 200, 200)).setV(0, 20);
  const b5 = engine.newParticle().setRad(8).setPos(width / 2 + 20, height / 2).setColor(color(200, 0, 200)).setV(0, -20);
  engine.newSpring(a5, b5, 0.01, 0.1);
}


function demoParticles() {
  const b = engine.newParticle().setRad(10).setPos(70, 10).setColor(color("green"));
}


function v(vec) {
  return "[" + vec.x.toFixed(1) + ", " + vec.y.toFixed(1) + "]";
}
