const EventEmitter = require('events')
const commandEmitter = new EventEmitter();
const testCommands = require("./testCommands.json");
const commandBuffer = testCommands.tests;

async function sleep(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

async function emitTests() {
	for(const command in testCommands) {
		emitCommand(command);
		await sleep(1000);
	}
}

function emitCommand(command) {
	commandEmitter.emit("command", command);
}

module.exports = {
	emitter: commandEmitter,
	start: () => emitTests()
};