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

function RobotButton(pressMultiplier, webButton, keyboardKey) {
    this.click = 0;
    this.webButton = webButton;
    this.keyboardKey = keyboardKey;

    webButton.addEventListener("pointerdown", () => {
        this.click = 100 * pressMultiplier;
    });

    webButton.addEventListener("pointerup", () => {
        this.click = 0;
    });

    window.addEventListener("keydown", (event) => {
        if(event.key === this.keyboardKey) {
            this.click = 100 * pressMultiplier;
            this.webButton.style.opacity = 0.5;
        }
    });

    document.addEventListener("keyup", (event) => {
        if(event.key === this.keyboardKey) {
            this.click = 0;
            this.webButton.style.opacity = 1;
        }
    });
}

const leftBtn = new RobotButton(-1, leftUI, "a");
const rightBtn = new RobotButton(1, rightUI, "d");

// Gryo Control Logic

let deadzoneNum = 5;
let gyroTurn = 0;

let maxLeftTurn = 90;
let maxRightTurn = -90;

function handleGyro(event) {
    var betaRotation = event.beta;
    if(betaRotation <= -deadzoneNum || betaRotation >= deadzoneNum){
        gyroTurn = Math.round((betaRotation / 180) * 100);
        console.log(gyroTurn);
    }
};

window.addEventListener("deviceorientation", handleGyro, true);

setInterval(() => {
    if(controlSwitchUI.checked){
        turn = gyroTurn;
    } else {
        turn = leftBtn.click + rightBtn.click;
    }
    console.log(turn);
    socket.emit('controllerContent', [
        turn,
        throttleUI.value
    ]);
}, 200);