require("dotenv").config();
const { SerialPort } = require("serialport");
const { start, emitter } = require("./commandScheduler.js");
const port = new SerialPort({
	path: process.env.SERIALPORT_PATH,
	baudRate: 9600,
});

const opened = new Promise(resolve => port.on("open", resolve));
emitter.on("command", command => {
	port.write(command);
});

opened.then(() => {
	port.write("Command Test");
	start().then(() => console.log("Complete Start Script"));
});