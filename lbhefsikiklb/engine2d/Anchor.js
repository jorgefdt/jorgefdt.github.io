// Unmovable point.
class Anchor extends Thing {
   constructor(arena){
      super(arena);
      this._color = color(100);  
      this._rad = 2;    
      this._maxV = 0;
   }  
   
   
   drawAgentOnly(){
      noStroke();
      fill(this.color);
      circle(this.pos.x, this.pos.y, this.rad*2);
      
      noFill();
      stroke(this.color);
      rectMode(CENTER);
      square(this.pos.x, this.pos.y, this.rad * 4);
   }   
}
