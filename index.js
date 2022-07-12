const {readFile} = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Gpio = require('pigpio').Gpio;
const turnLED = new Gpio(14, {mode: Gpio.OUTPUT});
const throttleLED = new Gpio(15, {mode: Gpio.OUTPUT});

turnLED.pwmRange(200);
throttleLED.pwmRange(200);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, repsonse) => {
    readFile('./index.html', 'utf-8', (err, html) => {
        if (err) {
            response.status(500).send('sorry, out of order')
        }
        repsonse.send(html)
    });
});

function wrapAround (val, cap){
    if(val < 0){
        val = Math.abs(val) + cap; 
    }
    return val;
}

//MAX VEX NUMBER: 2702.

function vexToVoltage(targetValue){
    return targetValue / 819;
}

io.on('connection', (socket) => {
    console.log("User Connected!")
    socket.on('controllerContent', (msg) => {
        let turn = wrapAround(msg[0], 100);
        let throttle = wrapAround(msg[1], 100);
        
        turnLED.pwmWrite(turn);
        throttleLED.pwmWrite(throttle);
    });
    socket.on('disconnect', () => {
        console.log('User Disconnected!')
        turnLED.digitalWrite(0);
        throttleLED.digitalWrite(0);
    });
});

server.listen(process.env.PORT || 3000, () => console.log(`App avaiable on http://localhost:3000`));