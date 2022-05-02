const basicLog = require("console").log;

module.exports = {
	...require("../serial.js"),
	write: basicLog,
	opened: Promise.resolve(),
	exit: () => Promise.resolve()
};