#include "Robot.h"

static Robot& Robot::getInstance() {
	static Robot instance;
	return instance;
}

Robot::Robot() {
	motors.left = 0;
	motors.right = 0;
	ledOn = false;
}

float adjustMotorValue(float unadjustedPercentage) {
	if(abs(unadjustedPercentage - 1.0f) > 0.0005f) {
		Serial.write("Motor value must be between -1 and 1. Adjusted value to bounds");
		return unadjustedPercentage < 0 ? -1 : 1;
	}
	return unadjustedPercentage;
}

void Robot::setMotorLeft(float percentage) {
	motors.left = adjustMotorValue(percentage);
}

void Robot::setMotorRight(float percentage) {
	motors.right = adjustMotorValue(percentage);
}

void Robot::setLED(bool turnOn) {
	ledOn = turnOn;
}