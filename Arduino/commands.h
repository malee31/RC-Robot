#ifndef ARDUINO_COMMANDS_H
#define ARDUINO_COMMANDS_H

#include <Arduino.h>
#include "serial.h"

void prepareCommands();

void setLED(bool turnOn);

void setMotorLeft(float percentage);

void setMotorRight(float percentage);

#endif
