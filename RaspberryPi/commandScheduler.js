const EventEmitter = require('events')
const commandEmitter = new EventEmitter();

/**
 * @typedef QueuedCommand
 * @type {[string, number, number]} Command to emit, duration, and delay before emit
 */

/**
 * Array of queued commands
 * @type {QueuedCommand[]}
 */
const commandBuffer = [];
const emitPromiseBuffer = [];

async function sleep(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

async function emitCommand(command, duration = 0, delay = 0) {
	commandBuffer.push([command, duration, delay]);
	await sleep(delay);
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