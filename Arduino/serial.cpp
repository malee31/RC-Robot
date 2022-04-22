#include "serial.h"

unsigned int CommandSerial::instructionSize = sizeof(char) + sizeof(unsigned int);
Instruction CommandSerial::STOP = {'\0', 0};

CommandSerial::CommandSerial() {
    currentInstruction = STOP;
}

void CommandSerial::readAction() {
    // TODO: Wire Serial1 TX and RX pins
    // if (Serial1.available() < instructionSize) {
    if (Serial.available() < instructionSize) {
        Serial.println("Serial Empty/Unavailable");
        currentInstruction = STOP;
        return;
    }

    // TODO: Read more than just the actionCode
    // TODO: Wire Serial1 TX and RX pins
    // char readByte = Serial1.read();
    char readByte = Serial.read();
    if (readByte == -1) {
        Serial.println("Unable to read. Stopping");
        currentInstruction = STOP;
        return;
    }

    Serial.print("Read: ");
    Serial.println(readByte);
    currentInstruction = {readByte, 0};
}

bool CommandSerial::stopped() {
    return currentInstruction.actionCode == CommandSerial::STOP.actionCode;
}
