const basicLog = require("console").log;
const jestLog = console.log;

jest.setTimeout(30000);
describe("Serial Mocked with console.log", () => {
	let serial;
	beforeEach(() => {
		// Changes Jest's verbose console.log() back to the original
		console.log = basicLog;
		serial = jest.mock('./serial');
	});

	afterEach(() => {
		// Restore Jest's console.log
		console.log = jestLog;
		serial.unmock();
	});

	test("Running Main File with Test Commands", async() => {
		basicLog("===== Running Index =====");
		const index = require("./index.js");
		expect.assertions(2);
		await expect(index).resolves.not.toThrow();
		basicLog("==== Finished Index =====");

		const scheduler = require("./commandScheduler.js");
		const { tests } = require("./testCommands.json");

		let delay = 0;
		for(const command of tests) {
			delay += command[2];
			scheduler.emitPromiseBuffer.push(scheduler.emitCommand(command[0], command[1], delay));
		}

		const finishEmit = new Promise(resolve => scheduler.emitter.once("empty", resolve));

		await expect(finishEmit).resolves.not.toThrow();
	});
});

test("Running Main File with Test Commands + Serial", async() => {
	// Changes Jest's verbose console.log() back to the original
	console.log = basicLog;

	basicLog("===== Running Index =====");
	const index = require("./index.js");
	expect.assertions(2);
	await expect(index).resolves.not.toThrow();
	basicLog("==== Finished Index =====");

	const scheduler = require("./commandScheduler.js");
	const { tests } = require("./testCommands.json");

	let delay = 0;
	for(const command of tests) {
		delay += command[2];
		scheduler.emitPromiseBuffer.push(scheduler.emitCommand(command[0], command[1], delay));
	}

	const finishEmit = new Promise(resolve => scheduler.emitter.once("empty", resolve));

	await expect(finishEmit).resolves.not.toThrow();

	const serial = jest.requireActual("./serial.js");
	await serial.exit();

	// Restore Jest's console.log
	console.log = jestLog;
});