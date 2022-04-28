#include "serial.h"
#include "commands.h"

CommandSerial commands;
unsigned long startTime, currentTime, offsetTime;

void setup() {
    Serial.begin(9600);
    Serial.println("Starting");
    prepareCommands();
    startTime = millis();
    offsetTime = startTime;
}

void continueAction() {
    if (commands.stopped()) {
        return;
    }
    String actionCode = commands.currentInstruction.actionCode;

    if (actionCode == "LED_ON") {
        setLED(true);
    }
    if (actionCode == "LED_OFF") {
        setLED(false);
    }
    if (actionCode == "FORWARD") {
        // Max both forwards
    }
    if (actionCode == "REVERSE") {
        // Max both backwards
    }
    if (actionCode == "LEFT") {
        // Max left forwards and right backwards
    }
    if (actionCode == "RIGHT") {
        // Max right forwards and left backwards
    }
}

void loop() {
    currentTime = millis();
    const unsigned long totalElapsedTime = currentTime - startTime;
    const unsigned long elapsedTime = currentTime - offsetTime;
    if (CommandSerial::serialState == 3 &&
        elapsedTime >= strtoul(commands.currentInstruction.actionEnd.c_str(), NULL, 0)) {
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
