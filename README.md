# Webby-Robot
A VEX V5 Brain and a website meet together with the janky mess of my interface between them.

## How does Webby Work *exactly*?
Webby works by having a web interface with two seperate control modes, D-Pad and Gyro, send websocket requests to a Node.js server running on a Raspberry Pi, 
which is attached to Webby's frame. To allow HTTPS communication for gyro support, use of a ngrok tunnel is required. Then, by making use of 3-Wire ports and PWM voltage 
creation on the Raspberry Pi, the turn and drive speed is transmitted to a VEX V5 brain, which has code to take the information as info from a VEX potentiometer, allowing
us to read numbers from the ports. These are then used to control the drive and turn speed of Webby.

## What is the current status of Webby?
Webby's code is nearly complete, with only a few features, including fully incorporated gryo support, still in development. However, Webby's VEX frame is not assembled,
as I currently do not have access to the parts. Webby's theorized frame is a modified H-Drive system to allow turning similar to a car's turning.
