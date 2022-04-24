# Arduino Client
This code runs on the Arduino to receive commands from the Raspberry Pi via USB.<br>
Power the Arduino using the USB port on the Raspberry Pi to allow them to communicate with each other<br>

# Command Format
The command format is a string describing the command in all caps followed by a space and the duration in milliseconds. End the command with a newline or other whitespace.<br>
Send the command through Serial to queue it up but keep the Arduino's internal Serial buffer size limit in mind.<br> 
Command format as a regex: `/[A-Z_]+\w[0-9]+\w/`
