function getAccel() {
  DeviceMotionEvent.requestPermission().then(response => {
    if (response == 'granted') {
      console.log("accelerometer permission granted");

      // acceleration in the XYZ axes (units in m/s^2)
      window.addEventListener('devicemotion', (e) => {
        let ax = e.accelerationIncludingGravity.x;
        let ay = e.accelerationIncludingGravity.y;
        let az = e.accelerationIncludingGravity.z;

        //dbox.set("x;y;z", ax.toFixed(1) + "; "+ ay.toFixed(1) + "; " + az.toFixed(1));
        engine.gForce.set(ax * cfg.gForceK, -ay * cfg.gForceK);
      });

      // phone orientation in the alpha-beta-gamma axes (units in degrees)
      window.addEventListener('deviceorientation', (event) => {
        // no-op
      });

      // Hide button. 
      document.getElementById("accelPermsButton").style.display = "none";
    } // if      
  });
}

function onloadHandler() {
  if (!DeviceMotionEvent.requestPermission) {
    console.warn("DeviceMotionEvent.requestPermission not available.");
    document.getElementById("accelPermsButton").style.display = "none";
  }
}
