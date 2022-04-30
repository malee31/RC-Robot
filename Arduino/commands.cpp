#include "commands.h"

void prepareCommands() {
    Serial.println("Starting Commands");
    pinMode(LED_BUILTIN, OUTPUT);
}

void setLED(bool turnOn) {
    digitalWrite(LED_BUILTIN, turnOn ? HIGH : LOW);
}

void setMotorLeft(float percentage) {
	// Pin 5 PWM
	// analogWrite(5, (int) (percentage * 255));
	digitalWrite(2, percentage < 0.001f ? LOW : HIGH);
}

void setMotorRight(float percentage) {
	// Pin 6 PWM
	// analogWrite(6, (int) (percentage * 255));
	digitalWrite(3, percentage < 0.001f ? LOW : HIGH);
}
