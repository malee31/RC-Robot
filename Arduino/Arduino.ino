#include "serial.h"
#include "commands.h"
#include "Robot.h"

CommandSerial commands;
unsigned long startTime, currentTime, offsetTime;
Robot robot;

void setup() {
	Serial.begin(9600);
	Serial.println("Starting");
	prepareCommands();
	startTime = millis();
	offsetTime = startTime;
	robot = Robot::getInstance();
}

void continueAction() {
	if (commands.stopped()) {
		// Serial.println("Early Stop");
		return;
	}
	String actionCode = commands.currentInstruction.actionCode;

	if (actionCode == "LED_ON") {
		robot.setLED(true);
	} else if (actionCode == "LED_OFF") {
		robot.setLED(false);
	}

	if (actionCode == "FORWARD") {
		// Max both forwards
		robot.setMotorLeft(1);
		robot.setMotorRight(1);
	} else if (actionCode == "REVERSE") {
		// Max both backwards
		robot.setMotorLeft(-1);
		robot.setMotorRight(-1);
	}

	if (actionCode == "LEFT") {
		// Max left forwards and right backwards
		robot.setMotorLeft(1);
		robot.setMotorRight(-1);
	} else if (actionCode == "RIGHT") {
		// Max right forwards and left backwards
		robot.setMotorLeft(-1);
		robot.setMotorRight(1);
	}

	setLED(robot.ledOn);
}

void loop() {
	currentTime = millis();
	const unsigned long totalElapsedTime = currentTime - startTime;
	const unsigned long elapsedTime = currentTime - offsetTime;
	if (CommandSerial::serialState == 3 && elapsedTime >= strtoul(commands.currentInstruction.actionEnd.c_str(), NULL, 0)) {
		// Shifts to next action and disposes of the expired one if the next one is ready. Will continue old action if new action is not ready
		commands.currentInstruction = commands.nextInstruction;
		Serial.println("Starting Action: " + commands.currentInstruction.actionCode);

		commands.nextInstruction = {"", ""};
		CommandSerial::serialState = 1;
		offsetTime = currentTime;
	}
	commands.readAction();
	continueAction();
}
