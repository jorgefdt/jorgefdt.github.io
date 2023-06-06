class Cube {
    constructor(centerX, centerY, centerZ, xSize, ySize, zSize) {
      this.minX = centerX - xSize/2;
      this.minY = centerY - ySize/2;
      this.maxX = centerX + xSize/2;
      this.maxY = centerY + ySize/2;
      
      this.center = createVector(centerX, centerY, centerZ);
      this.size = createVector(xSize, ySize, zSize);
      
      // Randomize birth to avoid excesive correlation between cubes. 
      this.birth = millis() + random(1000);
      this.targetSizeZ = zSize;
      this.originalZSize = zSize;
      this.lastGrowth = this.birth;
      this.color = color(random(30, 40));
    }


    get aabb() {return this;}
    get width() {return this.maxX - this.minX + 1;}
    get height() {return this.maxY - this.minY + 1;}
    get centerX() {return (this.minX + this.maxX)/2;}
    get centerY() {return (this.minY + this.maxY)/2;}
    get age() {return millis() - this.birth; }
      
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
    
    
    step() {
      const growthPeriodMs = 3000;
      // Change the target size.z when necessary.
      if (millis() - this.lastGrowth >= growthPeriodMs) {
        this.lastGrowth = millis();
        this.targetSizeZ = random(this.originalZSize*0.1, this.originalZSize);   
      }
      
      // Update speed and size.
      let sizeZSpeed = (this.targetSizeZ - this.size.z) * 0.05;
      this.size.z += sizeZSpeed;
      
      // Compensate position to keep bases aligned.
      this.center.z += sizeZSpeed/2;
    }
    

    draw(fillColor) {
      const adultAgeMs = 2000;
      
      // Use color if specified. Otherwise, if young, map to age.
      if (!fillColor) {      
        if(this.age < adultAgeMs) {
          const gb = 255 - map(this.age, 20, adultAgeMs, 0, 255-30, true);
          fillColor = color(gb/2, gb, gb);
        } else {
          fillColor = this.color;
        }
      }
      
      push();
      noStroke();
      //stroke(fillColor); // for debugging
      fill(fillColor);

      translate(this.center.x, this.center.y, this.center.z);
      box(this.size.x, this.size.y, this.size.z);
      pop();
    }
  }