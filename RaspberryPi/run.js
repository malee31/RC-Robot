require("dotenv").config();
const { opened, write } = require("./serial.js");
const { emitter } = require("./commandScheduler.js");

const indexMain = opened.then(() => {
	write("Hello");
});

module.exports = indexMain;