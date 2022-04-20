require("dotenv").config();
console.log(require("./serial.js"))
const { opened, write } = require("./serial.js");
const { start, emitter } = require("./commandScheduler.js");

emitter.on("command", command => {
	write(command);
});

const indexMain = opened.then(async() => {
	write("Command Test");
	await start();
	console.log("Complete Start Script");
	return 0;
});

module.exports = indexMain;