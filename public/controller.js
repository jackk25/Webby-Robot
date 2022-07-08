var left = document.getElementById("leftBtn");
var right = document.getElementById("rightBtn");
var throttle = document.getElementById("throttleSlider");

controlModeSwitch.addEventListener("click",() => {
    if (controlModeSwitch.checked) {
        console.log("Enabling Gyro!");
        gyroIcon.style.display = "block";
        left.style.display = "none";
        right.style.display = "none";
    } else {
        console.log("Enabling D-Pad!");
        gyroIcon.style.display = "none";
        left.style.display = "block";
        right.style.display = "block";
    }
});


var socket = io();

var lClick =  0;
var rClick = 0;


left.addEventListener('mousedown', () => {
    lClick = -100;
});

left.addEventListener('mouseup', () => {
    lClick = 0;
});

right.addEventListener('mousedown', () => {
    rClick = 100;
});

right.addEventListener('mouseup', () => {
    rClick = 0;
});

var deadzoneNum = document.querySelector("#deadzoneValue").value;
var orient = null;
var debugText = document.querySelector("#debugText");

let maxGyroLeftTurn = 0.7;
let maxGyroRightTurn = 0.18;

let turn = lClick + rClick;

deadzoneNum = Number(deadzoneNum);

try {
    orient = new AbsoluteOrientationSensor({ frequency: 10 });
    orient.onerror = (event) => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            console.log('Permission to access sensor was denied.');
            debugText.textContent = "Permission to access sensor was denied."
        } else if (event.error.name === 'NotReadableError') {
            console.log('Cannot connect to the sensor.');
            debugText.textContent = 'Cannot connect to the sensor.'
        }
    };
    orient.onreading = (e) => {
        // console.log(e.currentTarget.quaternion[2]);
        if (controlModeSwitch.checked) {
            var betaRotation = e.currentTarget.quaternion[2]

            if(betaRotation >= 0.5 + deadzoneNum){
                console.log("Turning Left!");
                turn = 100;
    
            } else if (betaRotation <= 0.5 - deadzoneNum) {
                console.log("Turning Right!");
                turn = -100.
            }
            
            debugText.textContent = betaRotation;
        }
    };
    orient.start();
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

setInterval(() => {
    console.log(turn);
    socket.emit('controllerContent', [
        turn,
        throttle.value
    ]);
}, 200);


