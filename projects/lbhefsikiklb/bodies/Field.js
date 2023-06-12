class Field {
   constructor(nCols, flowMagLimit) {
      this.nCols = nCols;
      this.cellSize = screen.width/this.nCols;
      this.nRows = screen.height/this.cellSize;
      this.cells = [];

      for(let i=0; i<this.nCols; i++){
         let col = [];
         this.cells[i] = col;
         for(let j=0; j<this.nRows; j++){
            col[j] = new Cell((i+0.5) * this.cellSize, (j+0.5) * this.cellSize, this.cellSize);
         }
      }
      
      this.perlinOffset = createVector(0, 0);
      this.perlinScale = 0.002;
      this.perlinStep = createVector(0.01, 0.01);
      this.perlinTimeStep = 1/7000;
      this.populatePerlin();
   }
   
   
  populatePerlin() {
    for(let i=0; i<this.nCols; i++){
      for(let j=0; j<this.nRows; j++){
        let c = this.cellAt(i, j);
        let x = c.pos.x * this.perlinScale + this.perlinOffset.x;
        let y = c.pos.y * this.perlinScale + this.perlinOffset.y;
                
        let t = millis() * this.perlinTimeStep + 100;
        let fx = noise(x, y, t);
        let fy = noise(x, y, t + 10);
        c.setFlow(fx,fy);        
      }
    }
  }
  
  
  step() {
      // for(let i=0; i<this.nCols; i++){
      //    for(let j=0; j<this.nRows; j++){
      //       this.cells[i][j].step();
      //    }
      // }
      
      dbox.set("perlinTimeStep", this.perlinTimeStep.toFixed(7));
      //this.perlinOffset.add(this.perlinStep);
      this.perlinOffset.x = sin(frameCount/100)/5;
      this.populatePerlin();
   }
   
   
   draw() {
      //this.drawGrid();
      
      // Cells
      noFill();
      for(let i=0; i<this.nCols; i++){
         for(let j=0; j<this.nRows; j++){
            this.cells[i][j].draw();
         }
      }
   }
   
   
   drawGrid() {
      stroke(255, 0, 0, 50);
      for(let i=1; i<this.nCols; i++){
         let x = i * this.cellSize;
         line(x, 0, x, height);
      }
      for(let j=1; j<this.nRows; j++){
         let y = j * this.cellSize;
         line(0, y, width, y);
      }
   }
   
    
   cellAt(i, j) {
     return this.cells[i][j];
   }
   
   
   getCellFor(b) {
      let i = floor(b.pos.x / this.cellSize);
      let j = floor(b.pos.y / this.cellSize);
      
      //console.log(i, j);
      return this.cells[i][j];
   }
   
   // ---------
  
  // updateRandomly() {
  //   for(let i=0; i<this.nCols; i++){
  //    for(let j=0; j<this.nRows; j++){
  //       let c = this.cellAt(i, j);
        
  //       // Calc contribution to field.
  //       let mv=15;
  //       let dx = random(-mv, mv);
  //       let dy = random(-mv, mv);
        
  //       // Apply exponential smoothing.       
  //       let newFlow = createVector(dx,dy).add(c.flow);
  //       combineExponentially(c.flow, newFlow, 0.97);
  //       c.applyLimits();
  //      }
  //   }
  // }
  
  
  // collect(neighbors, i, j) {
  //   if (0 <= i && i < field.nCols &&
  //       0 <= j && j < field.nRows){
  //     neighbors.push(this.cellAt(i, j));
  //   }
  // }
  
  
  // // Signal applies to cell and propagates to neighbors.
  // propagateRec(c, depth, signal){
  //   if(depth > 0){ // && amplitude != 0) {
  //     c.addFlow(signal);    
  //     let neighbors = this.getPropagationNeighbors(c.xIdx, c.yIdx);  
  //     neighbors.forEach(n => {
  //       this.propagateRec(n, depth-1, signal.mult(0.99));
  //     });
  //   }
  // }


  // getPropagationNeighbors(i, j){
  //   let cell = this.cellAt(i, j);
  //   let head = cell.flow.heading();
  //   // assume -2*PI <= head <= PI*2
  //   let neighbors = [];
  //   if (PI/4 <= head && head < PI*3/4) {
  //     this.collect(neighbors, i-1, j+1);
  //     this.collect(neighbors, i,   j+1);
  //     this.collect(neighbors, i+1, j+1);    
  //   } else if ((PI*3/4 <= head && head <= 2*PI) || (-2*PI <= head && head <= -3/4*PI)) {
  //     this.collect(neighbors, i-1, j-1);
  //     this.collect(neighbors, i-1, j);
  //     this.collect(neighbors, i-1, j+1);
  //   } else if (-PI*3/4 <= head && head < -PI/4) {
  //     this.collect(neighbors, i-1, j-1);
  //     this.collect(neighbors, i,   j-1);
  //     this.collect(neighbors, i+1, j-1);
  //   } else if (-PI/4 <= head || head < PI*4){
  //     this.collect(neighbors, i+1, j-1);
  //     this.collect(neighbors, i+1, j);
  //     this.collect(neighbors, i+1, j+1);
  //   }
  //   return neighbors;
  // }
  
  
  // // updates v0 with an exponential combination with v1.
  // // v0 = v0 * k01 + v1 * (1 - k01)
  // combineExponentially(v0, v1, k01) {
  //   v0.x = v0.x * k01 + v1.x * (1 - k01);
  //   v0.y = v0.y * k01 + v1.y * (1 - k01);
  // }
} // Field
