var deadzoneNum = document.querySelector("#deadzoneValue").value;
var gyro = null;
var debugText = document.querySelector("#debugText");

deadzoneNum = Number(deadzoneNum);

function enableGryo(){
  try {
    gyro = new AbsoluteOrientationSensor({ frequency: 10 });
    gyro.onerror = (event) => {
      // Handle runtime errors.
      if (event.error.name === 'NotAllowedError') {
        console.log('Permission to access sensor was denied.');
        debugText.textContent = "Permission to access sensor was denied."
      } else if (event.error.name === 'NotReadableError') {
        console.log('Cannot connect to the sensor.');
        debugText.textContent = 'Cannot connect to the sensor.'
      }
    };
    gyro.onreading = (e) => {
      // console.log(e.currentTarget.quaternion[2]);

      var betaRotation = e.currentTarget.quaternion[2]

      if(betaRotation >= 0.5 + deadzoneNum){
        console.log("Turning Left!");
      } else if (betaRotation <= 0.5 - deadzoneNum) {
        console.log("Turning Right!");
      }
      
      debugText.textContent = betaRotation;
    };
    gyro.start();
  } catch (error) {
    // Handle construction errors.
    if (error.name === 'SecurityError') {
      console.log('Sensor construction was blocked by the Permissions Policy.');
    } else if (error.name === 'ReferenceError') {
      console.log('Sensor is not supported by the User Agent.');
      debugText.textContent = 'Sensor is not supported by the User Agent.'
    } else {
      throw error;
    }
  }
}
