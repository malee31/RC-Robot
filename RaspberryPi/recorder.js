const readline = require("readline");
const fs = require("fs");
const path = require("path");

/**
 * Returns the current time in milliseconds
 * @returns {number} Current time in milliseconds
 */
function time() {
	return Math.round(Date.now());
}

module.exports = class RecordFile {
	/**
	 * Creates a new RecordFile instance
	 * @param {string} fileName - Name of file in records/ directory or an absolute path. Preferably with a txt file extension
	 * @param {boolean} [writeMode=false] - Whether to open file for writing or leave readOnly
	 */
	constructor(fileName, writeMode = false) {
		this.filePath = path.resolve(__dirname, "records", fileName);
		this.readOnly = !writeMode;
		this.currentCommand = "";
		this.startTime = time();
		this.fileStream = null;
		this.lineGenerator = null;
	}

	async open() {
		const createStream = this.readOnly ? fs.createReadStream(this.filePath) : fs.createWriteStream(this.filePath);
		try {
			this.fileStream = await createStream;
			this.lineGenerator = this.readLineGenerator();
		} catch(e) {
			throw new Error({
				message: `Unable to Open/Create File at ${this.filePath}`,
				err: e
			});
		}
	}

	/**
	 * Appends a command with a duration to the file the moment the command changes to minimize redundant lines
	 * @param {string} command - Name of the command. Pass an empty string or call with nothing to immediately flush a command to the file.
	 * @returns {Promise} Resolves after function is finished or line is added
	 * @throws {TypeError} Thrown if log is called on a read-only record file
	 */
	async log(command = "") {
		if(this.currentCommand === command) return;
		if(this.readOnly) throw new TypeError(`Record File was Opened in Read-Only Mode: ${this.filePath}`);

		const currentTime = time();
		const writePromise = this.fileStream.write(`${command} 0 ${currentTime - this.startTime}\n`);
		this.currentCommand = command;
		this.startTime = currentTime;

		await writePromise;
	}

	/**
	 * Generator for lines in the file in read mode
	 * @returns {AsyncGenerator<string, void, *>} Generator instance
	 */
	async* readLineGenerator() {
		const streamLines = readline.createInterface({
			input: this.fileStream,
			crlfDelay: Infinity
		});

		for await (const line of streamLines) {
			yield line;
		}
	}

	/**
	 * Uses the generator to read out a line
	 * @returns {Promise<string>}
	 */
	async readLine() {
		const line = await this.lineGenerator.next();
		return !line.done ? line.value : "";
	}

	/**
	 * Closes recording file
	 */
	async end() {
		if(this.readOnly) return;
		await new Promise(resolve => this.fileStream.end(resolve));
	}
}