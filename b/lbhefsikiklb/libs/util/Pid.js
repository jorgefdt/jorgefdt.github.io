// System controller. 
// Minimizes error by using Proportional, integrative, derivative tracking. 
class Pid {
  constructor(gain) {
    this._gains = {p: gain.p, i: gain.i, d: gain.d};
    this._target = 0;
    this._previousError = 0;
    this._iTerm = 0;
    this._limits = {
      iTermMin: -100,
      iTermMax: 100,
      actionMin: -100,
      actionMax: 100
    };
  }
  
  setTarget(newTarget) {
    this._target = newTarget;
    return this;
  }
  
  
  // Calculates the actuator given the current value. 
  update(current) {
    let error = current - this._target;
    let pTerm = error * this._gains.p;
    let dTerm = (error - this._previousError) * this._gains.d;

    this._iTerm += (error * this._gains.i);
    this._iTerm = constrain(this._iTerm, this._limits.iTermMin, this._limits.iTermMax);
    
    let action = pTerm + dTerm + this._iTerm;
    action = constrain(action, this._limits.actionMin, this._limits.actionMax);
    
    this._previousError = error;
    return action;
  }
} // Pid


class Pid2d {
  constructor(gains){
    this._pidX = new Pid(gains);
    this._pidY = new Pid(gains);
  }
   
  setTarget(targetV) {
    this._pidX.setTarget(targetV.x);
    this._pidY.setTarget(targetV.y);  
  }
  
  update(currentX, currentY) {
    return {
      x: this._pidX.update(currentX),
      y: this._pidY.update(currentY)
    };
  }
  
  
  update2d(currentV) {
    let m = this.update(currentV.x, currentV.y);
    return createVector(m.x, m.y);
  }
}