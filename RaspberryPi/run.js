require("dotenv").config();
const { opened } = require("./serial.js");

const indexMain = opened.then(() => {
	console.log("Serial Opened");
});

module.exports = indexMain;