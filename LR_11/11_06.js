const readline = require('readline');
const rpcWS = require('rpc-websockets').Server;

let server = new rpcWS({
    port: 4000,
    host: 'localhost'
});

server.event('A');
server.event('B');
server.event('C');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

console.log('Enter events A, B or C');
rl.on('line', function (line) {
    if(line == 'A' || line == 'B' || line == 'C'){
        server.emit(line);
    }
    else{
        console.log(`Event "${line}" not found`);
    }
})
