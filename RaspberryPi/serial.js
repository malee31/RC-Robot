const { SerialPort } = require("serialport");

const port = new SerialPort({
	path: process.env.SERIALPORT_PATH || "/dev/ttyAMA0",
	baudRate: 9600,
});

const opened = new Promise(resolve => port.on("open", resolve));

function serialLog(message) {
	console.log(`[Serial] ${message}`);
}

port.on("data", data => data.toString().split("\n").forEach(serialLog));

function write(data) {
	console.log(`[Signal] ${data}`);
	port.write(data);
}

module.exports = {
	write: write,
	opened: opened
};