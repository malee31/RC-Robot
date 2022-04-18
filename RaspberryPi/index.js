const { SerialPort } = require("serialport");
const { start, emitter } = require("./commandScheduler.js");
const port = new SerialPort({
	path: "/dev/ttyAMA0",
	baudRate: 9600,
});

const opened = new Promise(resolve => {
	port.on("open", resolve);
});

opened.then(() => {
	emitter.on("command", command => {
		port.write(command);
	})
	port.write("Command Test");
	start();
});