//UI Elements

var leftUI = document.getElementById("leftBtn");
var rightUI = document.getElementById("rightBtn");
var gyroUI = document.getElementById("gyroEnable");
var throttleUI = document.getElementById("throttleSlider");
var controlSwitchUI = document.querySelector("body > div.mainContent > label > input[type=checkbox]");

var debugText = document.querySelector("#debugText");

// Websocket
var socket = io();

//Toggle Gryo Visuals

controlSwitchUI.addEventListener("click",() => {
    if (controlSwitchUI.checked) {
        console.log("Enabling Gyro!");
        gyroUI.style.display = "block";
        leftUI.style.display = "none";
        rightUI.style.display = "none";
    } else {
        console.log("Enabling D-Pad!");
        gyroUI.style.display = "none";
        leftUI.style.display = "block";
        rightUI.style.display = "block";
    }
});

// Button Control Logic

class RobotButton {
    constructor(pressMultiplier, webButton, keyboardKey) {
        this.click = 0;
        this.webButton = webButton;
        this.keyboardKey = keyboardKey;

        webButton.addEventListener("mousedown", () => {
            this.click = 100 * pressMultiplier;
        });

        webButton.addEventListener("mouseup", () => {
            this.click = 0;
        });

        window.addEventListener("keydown", (event) => {
            if(event.key === this.keyboardKey) {
                this.click = 100 * pressMultiplier;
            }
        });

        document.addEventListener("keyup", (event) => {
            if(event.key === this.keyboardKey) {
                this.click = 0;
            }
        });
    }
}

const leftBtn = new RobotButton(-1, leftUI, "a");
const rightBtn = new RobotButton(1, rightUI, "d");

// Gryo Control Logic

let deadzoneNum = 0.1;
var orient = null;

let gyroTurn = 0;

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
        // Remove me !!!
        if (controlSwitchUI.checked) {
            var betaRotation = e.currentTarget.quaternion[2]

            if(betaRotation >= 0.5 + deadzoneNum){
                console.log("Turning Left!");
                gyroTurn = 100;
    
            } else if (betaRotation <= 0.5 - deadzoneNum) {
                console.log("Turning Right!");
                gyroTurn = -100;
            }
            
            debugText.textContent = betaRotation;
        }
        else {
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
    if(controlSwitchUI.checked){
        turn = gyroTurn;
    } else {
        //FIX ME !!!
        turn = lClick + rClick;
    }

    console.log(turn);

    socket.emit('controllerContent', [
        turn,
        throttleUI.value
    ]);
}, 200);