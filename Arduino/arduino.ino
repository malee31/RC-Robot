void setup() {
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
    delay(1000);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000);
    digitalWrite(LED_BUILTIN, LOW);
}
