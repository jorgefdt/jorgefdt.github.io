// Thing sibjext to the somilarion rules.
class Body extends Thing {
   constructor(arena){
      super(arena);
     // this.setColor(color(102, 102, 51));
      this.setColor(color(0, 51, 102));      
      this._drawer = null;
      this._bounder = null;
   } 
   
   static newRect(x, y, w, h, arena) {
     // TODO clean setRad up   
     const b = new Body(arena).setRad(w);
     b.pos.x = x;
     b.pos.y = y;
     
     b._drawer = () => {
        push();
        noFill();
        stroke(b._color);
        rectMode(CENTER);
        rect(x, y, w, h);
        pop();
     };
     b._bounder = (pos) => {
        return x - w/2 <= pos.x && 
               pos.x <= x + w/2 &&
               y - h/2 <= pos.y &&
               pos.y <= y + h/2;     
     };
     return b;
   }
   
   
   static newCircle(x, y, r, arena) {
     const b = new Body(arena).setRad(r);
     b.pos.x = x;
     b.pos.y = y;
      
     b._drawer = () => {
        push();
        //noFill();
        fill(b._color);
        stroke(b._color);
        circle(b.pos.x, b.pos.y, r*2);
        pop();
     };
     b._bounder = (pos) => (b.pos.dist(pos) <= r);
     return b;
   }
   
   drawAgentOnly(){
    this._drawer();
   }
   
   // overriden
   contains(pos) {
     return this._bounder(pos);
   }
   
   
}
