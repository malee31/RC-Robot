# Command Issuer
This code runs on a Raspberry Pi attached to the Arduino to issue commands to it and handle roughly timing and queueing up commands since Serial has a limit on the size of the buffer.<br>
The serial communication is one-way, Raspberry Pi to Arduino, and does not accept output from the Arduino.
To run on a Raspberry Pi, use `npm start`.<br>
To run on a device that isn't a Raspberry Pi, use `npm test` (All serial data will be logged instead).
