let dbox;
let fontRoboto;
let easycam;
let slideSound;


function preload() {
  fontRoboto = loadFont('assets/Roboto-Regular.otf');
  //soundFormats('mp3', 'ogg');
  //slideSound = loadSound('assets/Sliding-sound-effect.m4a');
}

let taken = [];
let rWidth, rHeight, sum;
const dxy = 1;

function setup() {
  createCanvas(screen.width, screen.height-200, WEBGL);
  setAttributes('antialias', true);
  console.log(Dw.EasyCam.INFO);
  easycam = new Dw.EasyCam(this._renderer, {distance : 500, center:[width/2, height/2+ 60, 0]}); 
  easycam.rotateZ(-PI/8);
  easycam.rotateX(-PI/4);
  textFont(fontRoboto);
  
  // setup spaces
  rWidth = width-10;
  rHeight = height-50;
  
  rWidth /= 4;
  rHeight = rWidth;
  sum = rWidth + rHeight;
  
  frameRate(60);
  //slideSound.play();
}


function draw() {
  // Draw
  background(0);
  applyLights();
  taken.forEach(s=> s.draw());   
   
  // Updates
  if (sum >= 6) {
    randomSlidingFill();
    //iterativeFill();
  }
  taken.forEach(s=> s.step());   
}


function applyLights() {
   const orbitRad = height*3/4;
   const t = frameCount * 2 * PI /(6*60);
   const tx = orbitRad * cos(t);
   const ty = orbitRad * sin(t);
   
   let x1 = tx + width/2;
   let y1 = ty + height/2;
   let z = 100;
   let x2 = -tx + width/2;
   let y2 = -ty + height/2;

   ambientLight(50);
   pointLight(255, 255, 255, 0, 200, 50);
   pointLight(255, 255, 255, 200, 0, 50);
   pointLight(255, 255, 255, width/2, height/2, 100);

   // Moving planet light, and a fixed one to iluminate the "planet".
   const addPlanet = false;   
   if (addPlanet) {
     pointLight(255, 255, 255, x1, y1, z);   
     push();
     noStroke();
     fill(255,255,255);
     translate(x1, y1, z);
     sphere(30);
     pop();
   }
}

// Iterates all values on X or Y, using a random value in the other dimension.
let iterY = screen.width/4;
function iterativeFill() {
  const minY = rHeight/2;
  const maxY = height - rHeight/2;
  
  if (iterY >= maxY) {
    iterY = minY;
    //sum *= 0.9;
    
    rWidth = random(sum*0.3, sum*0.3);
    rHeight = sum - rWidth;    
  } else {
    iterY += dxy;
  }
  
  addSlidingRect_(true, iterY);  
}


let consecFails = 0;
function randomSlidingFill() {
  rWidth = random(sum*0.3, sum*0.7);
  rHeight = sum - rWidth;   
  let cube = addRandomSlidingRect();
  if(cube) taken.push(cube);
  consecFails = cube ? 0 : consecFails+1;
  
  if (consecFails >= 10) {
    consecFails = 0;
    sum *= 0.9;   
  }
}


// Iterates all values on X or Y, using a random value in the other dimension.
function addRandomSlidingRect(){
  // Choose if sliding on x or y and calc limits.
  const slideDim = random() < 0.5 ? 'x' : 'y';
  const z = random(5, 25); // this is ignored now. 
  
  if (slideDim == 'x') {
    let y = random(rHeight/2, height - rHeight/2);
    return addSlidingRect_(null, y, z);
  } else { // slideY
    let x = random(rWidth/2, width - rWidth/2);
    return addSlidingRect_(x, null, z);
  } // TODO add z case
}

// One is random, other is fixed, and other dim is slided. 
// Iterates all values on X or Y, using a fixed value in the other dimension.
// dimensionToSlide: 'x', 'y', 'z'
// x,y,z: a fixed value or null. Only one can be null. 
// The null one will be slided. 
function addSlidingRect_(x, y, z) {
  let slideMin;
  let slideMax;
  
  // Define sliding limits
  if (!x) {
    slideMin = rWidth/2;
    slideMax = width - rWidth/2;
  } else if (!y) {
    slideMin = rHeight/2;
    slideMax = height - rHeight/2;
  } else { // !z
    // TODO
  }
  
  // Show the slider
  //drawSlider(slideX, nonSlideVal);

  // Search for fitting x or y.
  let cube = null;
  for (let cs = slideMin; !cube && cs <= slideMax; cs += dxy) {
    let a = new Cube(
      !x ? cs : x,
      !y ? cs : y,
      !z ? cs : z,
      rWidth, rHeight, z*2);

    // Check if intersects any taken. 
    let conflict = taken.find(s => s.intersects(a));
    if (conflict == null) {
      cube = a;
    }
  }

  return cube;
}


function drawSlider(slideOnX, nonSlideVal) {
  const sliderColor = color(255,0,0, 80);
  stroke(sliderColor);
  fill(sliderColor);
  if (slideOnX) {
    rect(0, nonSlideVal-rHeight/2, width, rHeight);
    // fill(255);
    // text(rWidth, width/2, nonSlideVal+rHeight/2);
  } else {
    rect(nonSlideVal, 0, rWidth, height);
  }
}


function addRect(){
  let v1x = random(rWidth/2, width - rWidth/2);
  let v1y = random(rHeight/2, height - rHeight/2);
  let depth = random(10, 30);
  let a = new Cube(v1x, v1y, depth/2, rWidth, rHeight, depth);
  
  // Check if intersects any taken. 
  let conflict = taken.find(s=> s.intersects(a));
  if (conflict == null) {
    taken.push(a);
  }
  return conflict == null ? a : null;
}


function v(vec) {
  return "[" + vec.x.toFixed(1) + ", " + vec.y.toFixed(1) + "]";
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}
