const basicLog = require("console").log;

module.exports = {
	write: basicLog,
	opened: Promise.resolve(),
	exit: () => Promise.resolve()
};