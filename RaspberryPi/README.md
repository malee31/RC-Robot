# Command Issuer
This code runs on a Raspberry Pi attached to the Arduino to issue commands to it and handles roughly timing and queueing commands since Serial has a buffer size limit.<br>
The serial communication is two-way via USB between the Raspberry Pi and Arduino. <br>
To run on a Raspberry Pi, use `npm start`.<br>
To run on a device that isn't a Raspberry Pi, use `npm test` (All serial data will be logged instead).
