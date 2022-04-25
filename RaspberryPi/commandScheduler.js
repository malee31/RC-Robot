const EventEmitter = require('events')
const commandEmitter = new EventEmitter();
// Use for all promises from emitCommand that you do not intend to handle yourself
const emitPromiseBuffer = [];
const commandBuffer = [];

async function sleep(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

async function emitCommand(command, duration = 0, delay = 0) {
	commandBuffer.push([command, duration]);
	await sleep(delay)
	shiftCommand();
}

function shiftCommand() {
	commandEmitter.emit("command", ...commandBuffer.shift());
	fireEmpty();
}

function fireEmpty() {
	if(commandBuffer.length === 0) {
		commandEmitter.emit("empty");
	}
}

module.exports = {
	emitter: commandEmitter,
	emitCommand,
	commandBuffer,
	emitPromiseBuffer
};