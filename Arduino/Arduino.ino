#include "serial.h"
#include "commands.h"

CommandSerial commands;
unsigned long startTime, currentTime;

void setup() {
    Serial.begin(9600);
    Serial1.begin(9600);

    Serial.println("Starting");
    prepareCommands();
    startTime = millis();
}

void continueAction() {
    if (commands.stopped()) {
        return;
    }
    String actionCode = commands.currentInstruction.actionCode;

    if(actionCode == "LED_ON") {
        setLED(true);
    }
    if(actionCode == "LED_OFF") {
        setLED(false);
    }

        Serial.print("Action Performed: ");
    Serial.println(commands.currentInstruction.actionCode);
}

void loop() {
    currentTime = millis();
    const unsigned long elapsedTime = currentTime - startTime;
    if (CommandSerial::serialState == 3 &&
        elapsedTime >= strtoul(commands.currentInstruction.actionEnd.c_str(), NULL, 0)) {
        commands.currentInstruction = commands.nextInstruction;
        commands.nextInstruction = {"", ""};
        CommandSerial::serialState = 1;
    }
    commands.readAction();
    continueAction();
}
