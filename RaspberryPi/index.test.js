jest.mock("./serial.js", () => require("./__mocks__/serial.js"));

test("Running Main File", async() => {
	const index = require("./index.js");
	expect.assertions(1);
	const val = await index;
	console.log("Done");
	expect(val).toEqual(0);
});