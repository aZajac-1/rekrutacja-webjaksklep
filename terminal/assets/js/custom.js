const terminalBody = document.getElementById('terminal-body');
const commandInput = document.getElementById('command-input');

const CUSTOM_COMMANDS = {
    hello: {
        msg: 'Hello :)'
    },
    // Add more custom commands here
};

commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const commandText = commandInput.value;
        terminalBody.innerHTML += `<div>you: ${commandText}</div>`;
        processCommand(commandText);
        commandInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

function processCommand(command) {
    const args = command.split(' ');
    switch (args[0].toLowerCase()) {
        case 'clear':
            terminalBody.innerHTML = '';
            break;
        case 'help':
            const commands = Object.keys(CUSTOM_COMMANDS).concat(['clear', 'help', 'quote', 'double']).join(', ');
            terminalBody.innerHTML += `<div>terminal: Available commands are ${commands}.</div>`;
            break;
        case 'quote':
            getQuote();

            break;
        case 'double':
            if (args[1] && !isNaN(parseFloat(args[1]))) {
                const number = parseFloat(args[1]);
                terminalBody.innerHTML += `<div>terminal: ${number} * 2 = ${number * 2}</div>`;
            } else {
                terminalBody.innerHTML += `<div>terminal: Please provide a number after 'double' command.</div>`;
            }
            break;
        default:
            executeCustomCommand(args[0]);
            break;
    }
}

async function getQuote() {
    const response = await fetch('https://dummyjson.com/quotes/random');

    var data = await response.json();
    console.log(data.quote);
    if (response) {
        var randomQuote = data.quote;
        terminalBody.innerHTML += '<div>terminal: "' + randomQuote + ' "</div>';
    }




}

function executeCustomCommand(command) {
    if (CUSTOM_COMMANDS[command]) {
        terminalBody.innerHTML += `<div>terminal: ${CUSTOM_COMMANDS[command].msg}</div>`;
    } else {
        terminalBody.innerHTML += `<div>terminal: Command not found. Try 'help'.</div>`;
    }
}