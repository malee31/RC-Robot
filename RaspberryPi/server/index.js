const app = require("./app.js");
let started = false;

function start() {
	if(started) return;
	started = true;
	app.listen(process.env.PORT || 3000);
}

module.exports = start;

if(require.main === module) {
	start();
}