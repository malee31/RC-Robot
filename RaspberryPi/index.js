require("dotenv").config();
const { opened, write } = require("./serial.js");
const { emitter } = require("./commandScheduler.js");

emitter.on("command", command => write(command).catch(console.error));

const indexMain = opened.then(() => console.log("= Command Serial Opened ="));

module.exports = indexMain;