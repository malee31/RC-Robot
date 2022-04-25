const scheduler = require("./commandScheduler");
const basicLog = require("console").log;
jest.mock("./serial.js", () => require("./__mocks__/serial.js"));

jest.setTimeout(30000);
test("Running Main File", async() => {
	basicLog("===== Running Index =====")
	const index = require("./index.js");
	expect.assertions(2);
	await expect(index).resolves.not.toThrow();
	basicLog("==== Finished Index =====");

	const scheduler = require("./commandScheduler.js");
	const { tests } = require("./testCommands.json");

	let delay = 0;
	for(const command of tests) {
		delay += command[1];
		scheduler.emitPromiseBuffer.push(scheduler.emitCommand(...command, delay));
	}

	const finishEmit = new Promise(resolve => scheduler.emitter.on("empty", resolve));

	await expect(finishEmit).resolves.not.toThrow();
});