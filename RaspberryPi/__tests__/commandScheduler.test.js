const scheduler = require("../commandScheduler");
const basicLog = require("console").log;
const jestLog = console.log;
jest.setTimeout(30000);

const tests = [
	["FORWARD", 0, 0],
	["REVERSE", 0, 2000],
	["LED_ON", 0, 2000],
	["LED_OFF", 0, 1000],
	["LED_ON", 0, 2000],
	["LED_OFF", 0, 1000],
	["LED_ON", 0, 2000],
	["LED_OFF", 0, 1000]
];
describe("Command Scheduler", () => {
	test("Scheduling and Emitting", async() => {
		expect.assertions(tests.length + 2);

		const scheduler = require("../commandScheduler");

		scheduler.emitter.on("command", command => {
			basicLog(`Received: ${command}`);
			expect(command).not.toBeFalsy();
		});

		scheduler.emitter.once("empty", () => {
			basicLog("Received Empty Event");
			expect("Emptied").toEqual(expect.anything());
		});

		basicLog("Emitting Test Commands");
		await expect(Promise.all(
			tests.map(command => scheduler.emitCommand(...command))
		)).resolves.not.toThrow();
		basicLog("Emitted Test Commands");
	});
});