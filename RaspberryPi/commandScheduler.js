const EventEmitter = require('events')
const RecordFile = require("./recorder");
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
let recordInstance = null;

async function sleep(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

async function toggleRecordingInstance() {
	if(recordInstance) {
		recordInstance = null;
		return;
	}
	recordInstance = new RecordFile("record.txt", true);
	return await recordInstance.open();
}

async function emitCommand(command, duration = 0, delay = 0) {
	commandBuffer.push(`${command} ${duration}`);
	await sleep(delay);
	if(recordInstance) {
		recordInstance.log(command);
	}
	shiftCommand();
}

function shiftCommand() {
	commandEmitter.emit("command", commandBuffer.shift());
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
	emitPromiseBuffer,
	toggleRecordingInstance
};