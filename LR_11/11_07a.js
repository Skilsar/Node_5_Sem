const readline = require('readline');
const rpcWSS = require('rpc-websockets').Client;

const ws = new rpcWSS('ws://localhost:4000');
ws.on('open', () => {
    console.log('Enter A, B or C to notify');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (line) {
        if (line == 'A' || line == 'B' || line == 'C') {
            ws.notify(line);
        } else {
            console.log(`Event "${line}" not found`);
        }
    })
});