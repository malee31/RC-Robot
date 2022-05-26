const request = require("supertest");

describe("Express App", () => {
	test("Exported", () => {
		const app = require("../server/app.js");
		expect(app).toEqual(expect.anything());
	});

	test("Sends Index HTML File", () => {
		const app = require("../server/app.js");
		return request(app)
			.get("/")
			.expect(200)
			.expect("Content-Type", /html/);
	});
});