var left = document.getElementById("leftBtn");
var right = document.getElementById("rightBtn");
var throttle = document.getElementById("throttleSlider");

var socket = io();

var lClick =  0;
var rClick = 0;


left.addEventListener('mousedown', () => {
    lClick = 1;
});

left.addEventListener('mouseup', () => {
    lClick = 0;
});

right.addEventListener('mousedown', () => {
    rClick = -1;
});

right.addEventListener('mouseup', () => {
    rClick = 0;
});

setInterval(() => {
    var turn = lClick + rClick;
    console.log(turn);
    socket.emit('controllerContent', [
        turn,
        throttle.value
    ]);
}, 1000);


