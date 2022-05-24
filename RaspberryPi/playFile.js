const commandScheduler = require("./commandScheduler.js");
const RecordFile = require("./recorder.js");
const path = require("path");

async function emitFile(fileName) {
	const record = new RecordFile(path.resolve(__dirname, "records", fileName));
	await record.open();
	let line = await record.readLine();
	while(line) {
		console.log(line);
		let [command, duration] = line.split(" ");
		duration = Number(duration);
		await commandScheduler.emitCommand(command, duration);
		line = await record.readLine();
	}
}

console.log(require.main)
if(require.main === module) {
	const fileName = process.argv[2];
	if(!fileName) {
		console.log("No File Name Provided");
		process.exit(1);
	}
	emitFile(fileName)
		.then(() => console.log("End of Track"))
		.catch(err => console.log(`Unable to Play: ${err}`));
}