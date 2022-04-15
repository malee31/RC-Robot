typedef struct {
    char actionCode;
    unsigned int actionEnd;
} Instruction;
Instruction STOP = {'\0', 0};
Instruction currentInstruction = STOP;
unsigned long startTime, currentTime;
const unsigned int instructionSize = sizeof(char) + sizeof(unsigned int);

void setup() {
    Serial.begin(9600);
    Serial1.begin(9600);
    Serial.println("Starting");

    pinMode(LED_BUILTIN, OUTPUT);

    startTime = millis();
}

void continueAction() {
    if (currentInstruction.actionCode == STOP.actionCode) {
        return;
    }
    Serial.print("Action Performed: ");
    Serial.println(currentInstruction.actionCode);
}

void readAction() {
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

void loop() {
    currentTime = millis();
    const unsigned long elapsedTime = currentTime - startTime;
    if (elapsedTime >= currentInstruction.actionEnd) {
        readAction();
    }
    continueAction();

    delay(500);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(500);
    digitalWrite(LED_BUILTIN, LOW);
}
