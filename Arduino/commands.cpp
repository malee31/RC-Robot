#include "commands.h"

void prepareCommands() {
    Serial.println("Starting Commands");
    pinMode(LED_BUILTIN, OUTPUT);
}

void setLED(bool turnOn) {
    digitalWrite(LED_BUILTIN, turnOn ? HIGH : LOW);
}
