# Arduino Client

This code runs on the Arduino to receive commands from the Raspberry Pi via USB.  
Power the Arduino using the USB port on the Raspberry Pi to allow them to communicate with each other.

## Command Format

The command format is a string describing the command in all caps followed by a space and the duration in milliseconds.
End the command with a newline or other whitespace.  
Send the command through Serial to queue it up but keep the Arduino's internal Serial buffer size limit in mind.  
Command format as a regex: `/[A-Z_]+\w[0-9]+\w/`

## Valid Commands

```
LED_ON: Turns on LED
LED_OFF: Turns off LED
FORWARD: Both motors to full forwards
REVERSE: Both motors to full reverse
LEFT: Sets motors to rotate left
RIGHT: Sets motors to rotate right
```
