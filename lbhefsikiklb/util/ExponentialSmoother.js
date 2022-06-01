class ExponentialSmoother {
  constructor(k01) {
    // Closer to 1 smoothes more. 
    this._k01 = constrain(k01, 0, 1);
    this._lastValue = 0;
  }
  
  update(currentValue) {
    const smoothed = this._k01 * currentValue + (1-this._k01) * this._lastValue;
    this._lastValue = smoothed;
    return smoothed;
  }
}