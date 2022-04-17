#include "serial.h"

CommandSerial commands;
unsigned long startTime, currentTime;

void setup() {
    Serial.begin(9600);
    Serial1.begin(9600);
    Serial.println("Starting");

    pinMode(LED_BUILTIN, OUTPUT);

    startTime = millis();
}

void continueAction() {
    if (commands.stopped()) {
        return;
    }
    Serial.print("Action Performed: ");
    Serial.println(commands.currentInstruction.actionCode);
}

void loop() {
    currentTime = millis();
    const unsigned long elapsedTime = currentTime - startTime;
    if (elapsedTime >= commands.currentInstruction.actionEnd) {
        commands.readAction();
    }
    continueAction();

    delay(500);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(500);
    digitalWrite(LED_BUILTIN, LOW);
}
