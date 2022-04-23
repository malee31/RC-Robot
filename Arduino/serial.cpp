#include "serial.h"

unsigned int CommandSerial::instructionSize = sizeof(char) + sizeof(unsigned int);
Instruction CommandSerial::STOP = {"STOP", "0"};
int CommandSerial::serialState = 0;

CommandSerial::CommandSerial() {
    currentInstruction = STOP;
    nextInstruction = {"", ""};
}

void CommandSerial::readAction() {
    // TODO: Wire Serial1 TX and RX pins
    if(Serial.available() == 0) {
//        Serial.println("Serial Empty/Unavailable");
        return;
    }

    if(CommandSerial::serialState == 3) {
        // Next action already ready. Does not read from serial
        return;
    }

    char readByte = Serial.read();
    // TODO: Read more than just the actionCode
    // TODO: Wire Serial1 TX and RX pins
    Serial.print("Read: ");
    Serial.println(readByte);

    if(CommandSerial::serialState == 1) {
        // Read actionCode
        // Separator character
        if(isSpace(readByte)) {
            CommandSerial::serialState = 2;
            return;
        }
        nextInstruction.actionCode += readByte;
    } else if(CommandSerial::serialState == 2) {
        // Read Duration
        if(isSpace(readByte)) {
            CommandSerial::serialState = 3;
            return;
        }
        nextInstruction.actionEnd += readByte;
    }
}

bool CommandSerial::stopped() {
    return currentInstruction.actionCode == CommandSerial::STOP.actionCode;
}
