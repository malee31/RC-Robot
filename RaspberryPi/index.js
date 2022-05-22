require("dotenv").config();
const { opened, write } = require("./serial.js");
const { emitter } = require("./commandScheduler.js");
const startServer = require("./server/index.js");

emitter.on("command", command => write(command).catch(console.error));

const indexMain = opened.then(() => {
	startServer();
});

module.exports = indexMain;