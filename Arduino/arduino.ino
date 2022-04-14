unsigned long startTime, currentTime, instructionEnd;
char currentInstruction = '\0';

void setup() {
    Serial.begin(9600);
    Serial.println("Starting");

    pinMode(LED_BUILTIN, OUTPUT);

    startTime = millis();
    instructionEnd = 0;
}

void continueAction() {
    Serial.println("Action Performed");
}

void readAction() {
    if (Serial.available() > 0) {
        char readByte = Serial.read();
        if (readByte != -1) {
            if (currentInstruction == '\0') {
                Serial.println("Nothing read and nothing valid to resume");
            } else {
                Serial.println("Unable to read. Continuing expired instruction");
            }
        } else {
            currentInstruction = readByte;
        }
    } else {
        Serial.println("Serial Unavailable");
    }
}

void loop() {
    currentTime = millis();
    const unsigned long elapsedTime = currentTime - startTime;
    if (elapsedTime >= instructionEnd) {
        readAction();
    }
    continueAction();

    delay(1000);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000);
    digitalWrite(LED_BUILTIN, LOW);
}
