# RC Robot
A hardware project that uses an Arduino and Raspberry Pi to control a robot and its motors.

# Materials
* Arduino
* Power source (for Raspberry Pi)
	* Power bank
	* MicroUSB or USB-C cable depending on Raspberry Pi model
* Motors with encoders (2)
* Relays (2)
* Breadboard
* Wires
* Round wheels (2)
* Freely spinning wheels (1-2)

# Software Setup
Optional `.env` file or environment variable `SERIALPORT_PATH` for changing path of the serialport in `/dev`
1. Connect Arduino to computer and upload code from the `Arduino/` folder
2. Upload code from the `RaspberryPi/` folder to the Raspberry Pi
3. Install dependencies on Raspberry Pi with `npm install`
4. Start code on Raspberry Pi with `npm start` after hardware set up (Arduino starts automatically)

# Hardware Setup (So far)
Complete after completing the software setup.
1. Power Arduino with an outlet during testing
2. Power a set of the breadboard's power rails with 12V
3. Power the other set of the breadboard's power rails with the Arduino's 3.3V
4. Power two relays using the 12V rails on the breadboard  
	(The left relay will be for the left motor and the right relay will be for the right motor)
5. Connect relays to their respective motors
6. Connect gate ground from both relays to 3.3V ground power rail on the breadboard
7. Connect gate for left relay to pin 5
8. Connect gate for right relay to pin 6
9. Attach motor encoders to Arduino (Instructions WIP)
10. ...
11. Power Raspberry Pi with a power bank
12. Connect the Arduino to the Raspberry Pi via USB port
13. Run the project on the Raspberry Pi with `npm start` and enjoy!