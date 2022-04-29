#ifndef ARDUINO_SERIAL_H
#define ARDUINO_SERIAL_H

#include <Arduino.h>

typedef struct {
	String actionCode;
	String actionEnd;
} Instruction;

class CommandSerial {
public:
	static int serialState;
	static unsigned int instructionSize;
	static Instruction STOP;
	Instruction currentInstruction;
	Instruction nextInstruction;

	CommandSerial();

	void readAction();

	bool stopped();
};

#endif
