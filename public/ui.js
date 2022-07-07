var controlModeSwitch = document.querySelector("body > div.mainContent > label > input[type=checkbox]");
var left = document.getElementById("leftBtn");
var right = document.getElementById("rightBtn");
var gyroIcon = document.getElementById("gyroEnable");


controlModeSwitch.addEventListener("click",() => {
    if (controlModeSwitch.checked) {
        console.log("Enabling Gyro!");
        enableGryo();
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