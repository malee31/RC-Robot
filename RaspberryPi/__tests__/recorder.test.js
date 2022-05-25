const Recorder = require("../recorder.js");

describe("Recorder Tests", () => {
	test("Open and Write to Record", async() => {
		const recorderInstance = new Recorder("recorder.test.txt", true);
		await expect(recorderInstance.open()).resolves.not.toThrow();
		await expect(recorderInstance.log("NOOP")).resolves.not.toThrow();
		await expect(recorderInstance.end()).resolves.not.toThrow();
	});

	test("Read from Record", async() => {
		const recorderInstance = new Recorder("recorder.test.txt");
		await expect(recorderInstance.open()).resolves.not.toThrow();
		await expect(recorderInstance.readLine()).resolves.not.toEqual("");
		await expect(recorderInstance.end()).resolves.not.toThrow();
	});
});