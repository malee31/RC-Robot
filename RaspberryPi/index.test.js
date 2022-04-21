const basicLog = require("console").log;
jest.mock("./serial.js", () => require("./__mocks__/serial.js"));

test("Running Main File", async() => {
	basicLog("===== Running Index =====")
	const index = require("./index.js");
	expect.assertions(1);
	await index;
	basicLog("==== Finished Index =====");
	await expect(index).resolves.toBeFalsy();
});