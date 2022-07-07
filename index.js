const {readFile} = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Gpio = require('pigpio').Gpio;
const led = new Gpio(14, {mode: Gpio.OUTPUT});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, repsonse) => {
    readFile('./index.html', 'utf-8', (err, html) => {
        if (err) {
            response.status(500).send('sorry, out of order')
        }
        repsonse.send(html)
    });
});

io.on('connection', (socket) => {
    console.log("User Connected!")
    socket.on('controllerContent', (msg) => {
        if(msg[0] > 0){
            led.pwmWrite(255);
        } else if (msg[0] < 0){
            led.pwmWrite(50);
        } else {
            led.digitalWrite(0);
        }
    });
    socket.on('disconnect', () => {
        console.log('User Disconnected!')
        led.digitalWrite(0);
    });
  });

server.listen(process.env.PORT || 3000, () => console.log(`App avaiable on http://localhost:3000`));