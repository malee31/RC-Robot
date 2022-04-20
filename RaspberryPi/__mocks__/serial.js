module.exports = {
	...require("../serial.js"),
	write: jest.fn(console.log),
	opened: Promise.resolve()
};