const { SerialPort } = require("serialport");

const port = new SerialPort({
	path: process.env.SERIALPORT_PATH,
	baudRate: 9600,
})

const opened = new Promise(resolve => port.on("open", resolve));

port.on("data", data => console.log(`Received: ${data}`));

function write(data) {
	console.log(`Write: ${data}`);
	port.write(data);
}

module.exports = {
	write: write,
	opened: opened
};