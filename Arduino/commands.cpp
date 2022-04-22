#include "commands.h"

void prepareCommands() {
    CommandSerial::logSerial.println("Starting Commands");
    pinMode(LED_BUILTIN, OUTPUT);
}

void setLED(bool turnOn) {
    digitalWrite(LED_BUILTIN, turnOn ? HIGH : LOW);
}
