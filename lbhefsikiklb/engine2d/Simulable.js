class Simulable extends MyBaseInterface {
  step() {
    this._UNIMPLEMENTED("step()");
  }

  draw() {
    this._UNIMPLEMENTED("draw()");
  }
}

class BadSimulable extends Simulable {
  step() {
  }
}

class GoodSimulable extends Simulable {
  step() {
  }

  draw() {
  }  
}
