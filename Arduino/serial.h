#ifndef ARDUINO_SERIAL_H
#define ARDUINO_SERIAL_H

#include "Arduino.h"

typedef struct {
    char actionCode;
    unsigned int actionEnd;
} Instruction;

class CommandSerial {
public:
    static auto &commandSerial = Serial1;
    static auto &logSerial = Serial;
    static unsigned int instructionSize;
    static Instruction STOP;
    Instruction currentInstruction;

    CommandSerial();

    void readAction();

    bool stopped();
};

#endif
