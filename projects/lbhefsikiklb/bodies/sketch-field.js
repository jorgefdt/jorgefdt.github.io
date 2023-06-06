const cfg1 = {  
  fpsSmoothingK: 0.2,

  // Screen
  screen: { width: 400, height: 300 } // Updated in setup()
};

const cfg = cfg1;
let dbox;
let fpsSmoother;
let field;

let xAngOffset = 0, yAngOffset = 0;
let fontRoboto;
let easycam;

function preload() {
  fontRoboto = loadFont('assets/Roboto-Regular.otf');
}

function setup() {
  cfg.screen.width = min(screen.width - 20, window.innerWidth - 15);
  cfg.screen.height = min(screen.height - 200, window.innerHeight - 15);
  createCanvas(cfg.screen.width, cfg.screen.height, WEBGL);
  setAttributes('antialias', true);
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer, {distance : 300}); 
  easycam.rotateX(-PI/4);
  easycam.rotateZ(-PI/8);
  
  dbox = new DebugBox();
  fpsSmoother = new ExponentialSmoother(cfg.fpsSmoothingK);
  field = new Field(30);
  
  textFont(fontRoboto);
  //noLoop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}


function draw() {
  // ==== update
  let dt = 0.05;//deltaTime / 1000; // ms to seconds
  let start = millis();
  field.step();
  dbox.set("sim.step ms", (millis() - start).toFixed(2));  
  //tryNeighbors();
    
  // ==== draw
  start = millis();
  background(20);
  drawAxis();

  scale(0.5);
  translate(-width/2, -height/2);
  field.draw();

  easycam.beginHUD();
  dbox.draw();
  easycam.endHUD();
  
  dbox.set("sim.draw ms", (millis() - start).toFixed(2));
  dbox.set("sim.fps", round(fpsSmoother.update(frameRate())));
}


function drawAxis() {
  push();
  translate(-width/3, -height/3);
  strokeWeight(1);
  stroke(255, 32,  0); line(0,0,0,100,0,0);
  stroke( 32,255, 32); line(0,0,0,0,100,0);
  stroke(  0, 32,255); line(0,0,0,0,0,100);
  pop();
}


function tryNeighbors() {
  let c = field.cellAt(round(field.nCols/2), round(field.nRows/2)-3);
  let angleDeg = millis()/50;
  let angleRad = radians(angleDeg);
  c.flow.setMag(halfCell);
  c.flow.setHeading(angleRad);
  
  let neighbors = getPropagationNeighbors(c.xIdx, c.yIdx);  
  neighbors.forEach(n => {
    n.isActive = true;
    n.addFlow(c.flow);
  });
}

function exps(t0, t, k01) {
  return t0 * (1-k01) + t * k01;
}
    
function v(vec) {
  return "[" + vec.x.toFixed(1) + ", " + vec.y.toFixed(1) + "]";
}
