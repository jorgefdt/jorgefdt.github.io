class Util {
   static numSpacialSearches = 0;

   static setVector(vec, xOrPos, yOrNothing) {
     if (yOrNothing !== undefined) {
       vec.set(xOrPos, yOrNothing);
     } else {
       vec.set(xOrPos);    
     }
   }
   
   
   static sumVectors(col, vectorExtract) {
      let sum = new p5.Vector();
      col.forEach(b=> sum.add(vectorExtract(b)));
      return sum;
   }
   
   
   static avgVectors(col, vectorExtract) {
      let sum = this.sumVectors(col, vectorExtract);
      sum.div(col.length);
      return sum;
    }
  
  
   // Collects the elements in col that satisfy condition.  
   static collectIf(col, condition){
     const result = [];
     col.forEach(b=>{
       if(condition(b)) {
          result.push(b);
       }
     });
     return result;
   }
   
   
   static forEachIf(col, condition, task){
     col.forEach(b=>{
       if(condition(b)) {
          task(b);
       }
     });
   }

  
  static getNeighbours(col, b, radius) {
    return Util.getNeighboursWithCondition(col, b, radius, null);
  }
  
  
  static getNeighboursWithType(col, b, radius, type) {
    return Util.getNeighboursWithCondition(col, b, radius, b2=>{
      return b2.constructor.name === type;
    });
  }
  
  
  // condition is optional
  static getNeighboursWithCondition(col, b, radius, condition) {
    Util.numSpacialSearches++;
    
    const cond = condition || null;
    const maxDSq = radius * radius;
    const neighbours = [];
    col.forEach(b2=>{
       if (b2 != b && (cond == null || cond(b2))) {
          let dx = b2.pos.x - b.pos.x;
          let dy = b2.pos.y - b.pos.y;
          let dSq = dx*dx+dy*dy;
          if(dSq <= maxDSq){
             neighbours.push(b2);
          }
       }
    });
 
    return neighbours;
  }
  
  
  // Returns the nearest object, or null if no one. 
   static getNearestNeighbourWithCondition(col, b, condition) {
    Util.numSpacialSearches++;
         
    const cond = condition || null;
    let closestDistSq = Number.MAX_VALUE;
    let closest = null;
    col.forEach(b2=>{
       if (b2 != b && (cond == null || cond(b2))) {
          let dx = b2.pos.x - b.pos.x;
          let dy = b2.pos.y - b.pos.y;
          let dSq = dx*dx+dy*dy;
          if(dSq <= closestDistSq){
             closest = b2;
             closestDistSq = dSq;
          }
       }
    });
 
    return closest;
  }
  
  
  static getNearestNeighbour(col, b) {
    return Util.getNearestNeighbourWithCondition(col, b, null);
  }
    
  
  static getNearestNeighbourWithType(col, b, type) {
    return Util.getNearestNeighbourWithCondition(col, b, b2=>{
      return b2.constructor.name === type;
    });
  }
  
  
  static drawVector(pos, v, vMultiplier, color){
    push();
    stroke(color);
    translate(pos);
    line(0, 0, v.x*vMultiplier, v.y*vMultiplier);
    pop();
  }
}