#ifndef ARDUINO_ROBOT_H
#define ARDUINO_ROBOT_H

#include <Arduino.h>

typedef struct {
	float left;
	float right;
} Motors;

float adjustMotorValue(float unadjustedPercentage);

class Robot {
public:
	Motors motors;
	bool ledOn;

	static Robot& getInstance();

	Robot();

	void setMotorLeft(float percentage);

	void setMotorRight(float percentage);

	void setLED(bool turnOn);
};


#endif
