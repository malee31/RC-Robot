const { SerialPort } = require("serialport");

const port = new SerialPort({
	path: process.env.SERIALPORT_PATH,
	baudRate: 9600,
})

const opened = new Promise(resolve => port.on("open", resolve));

function write(data) {
	port.write(data);
}

module.exports = {
	write: write,
	opened: opened
};