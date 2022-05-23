const express = require("express");
const path = require("path");
const { emitCommand, toggleRecordingInstance } = require("../commandScheduler");
const app = express();
let started = false;

app.use(express.static(path.resolve(__dirname, "static")));

app.post("/send/:command", async(req, res) => {
	const command = req.params.command;
	if(command === "RECORD") {
		console.log("Record");
		await toggleRecordingInstance();
		return res.send("Recording toggled");
	}
	await emitCommand(command);
	return res.send(`Command Successfully Added: ${command}`);
});

function start() {
	if(started) return;
	started = true;
	app.listen(process.env.PORT || 3000);
}

module.exports = start;

if(require.main === module) {
	start();
}