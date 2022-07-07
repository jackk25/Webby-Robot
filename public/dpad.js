var left = document.getElementById("leftBtn");
var right = document.getElementById("rightBtn");

left.addEventListener('mousedown', () => {
    console.log("Bot is moving left");
});

left.addEventListener('mouseup', () => {
    console.log("Bot has stopped moving left");
});

right.addEventListener('mousedown', () => {
    console.log("Bot is moving right");
});

right.addEventListener('mouseup', () => {
    console.log("Bot has stopped moving right");
});