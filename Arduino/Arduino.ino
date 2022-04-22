#include "serial.h"
#include "commands.h"

CommandSerial commands;
unsigned long startTime, currentTime;

void setup() {
    CommandSerial::commandSerial.begin(9600);
    CommandSerial::logSerial.begin(9600);

    CommandSerial::logSerial.println("Starting");
    prepareCommands();
    startTime = millis();
}

void continueAction() {
    if (commands.stopped()) {
        return;
    }
    CommandSerial::logSerial.print("Action Performed: ");
    CommandSerial::logSerial.println(commands.currentInstruction.actionCode);
}

void loop() {
    currentTime = millis();
    const unsigned long elapsedTime = currentTime - startTime;
    if (elapsedTime >= commands.currentInstruction.actionEnd) {
        commands.readAction();
    }
    continueAction();

    delay(500);
    setLED(true);
    delay(500);
    setLED(false);
}
