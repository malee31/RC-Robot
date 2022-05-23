const textConsole = document.querySelector(".console");
const controls = document.querySelector(".controls");

function appendToConsole(line) {
	textConsole.innerText = textConsole.innerText ? `${textConsole.innerText}\n${line}` : line;
	textConsole.scrollTop = textConsole.scrollHeight;
}

function popFromConsole() {
	const consoleText = textConsole.innerText.split("\n");
	const pop = consoleText.pop();
	textConsole.innerText = consoleText.join("\n");
	return pop;
}

appendToConsole("Initial Message");

function emitCommand(e) {
	const command = e.target.innerText;
	appendToConsole(`Sending Command Signal: ${command}`);
	console.log(command);
	fetch(`/send/${command}`, { method: "POST" })
		.then(res => res.text())
		.then(resText => {
			popFromConsole();
			appendToConsole(`Server: ${resText}`)
		});
}

controls.querySelectorAll(".control-clickable").forEach(controlClick => {
	controlClick.addEventListener("mousedown", emitCommand);
})