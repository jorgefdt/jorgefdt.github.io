class DebugBox {
  constructor(){
    this._map = new Map();
    this._boxX = 10;
    this._boxY = 10;
    this._backgroundColor = color(0, 0, 0, 200);
  }
  
  set(label, value) {
    this._map.set(label, value);
  }
  
  
  draw() {
    const margin = 6;
    const rowHeight = 12 + 1;
    const textX = this._boxX + margin;
    
    const bWidth = this.findMaxWidth();
    const bHeight = this._map.size * rowHeight + margin;
    
    stroke(255, 200);
    fill(this._backgroundColor);
    rect(this._boxX, this._boxY, bWidth, bHeight, 3);
    
    noStroke();
    fill(250);
    textSize(12);
    let nextRowY = this._boxY + rowHeight;
    this._map.forEach((value, label) => {
      let str = label + ': ' + value;
      text(str, textX, nextRowY);
      nextRowY += rowHeight;
    });
  }
  
  // Very rough approximation. 
  findMaxWidth(){
    let maxLen = 0;
    this._map.forEach((value, label) => {
      let str = label + ': ' + value;
       //let b = this._font.textBounds(label + ': ' + value, textX, nextRowY);
       if(maxLen < str.length) {
         maxLen = str.length;
       }
    });
    
    return maxLen * 7;
  }
}
