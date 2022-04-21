require("dotenv").config();
const { opened, write } = require("./serial.js");
const { start, emitter } = require("./commandScheduler.js");

emitter.on("command", command => {
	write(command);
});

const indexMain = opened.then(async() => {
	write("Command Test");
	await start();
	write("Complete Start Script");
});

module.exports = indexMain;