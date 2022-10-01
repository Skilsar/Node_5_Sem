const http = require('http');
const process = require('process');
const host = 'localhost';
const port = 5000; 

var stateApp = 'Normal';

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(`<h1>State of the App: ${stateApp}</h1>`);
}).listen(port, host);
console.log(`Server running on http://localhost:5000`);
process.stdout.write(`Current state: ${stateApp}\n${stateApp} -> `);

//stdin - считывание простого входного потока (консоль)
process.stdin.setEncoding('utf-8');//кодировка ВП
process.stdin.on('readable', ()=>{
    let currentState = null;

    while ((currentState = process.stdin.read()) != null){
        let currentStateValue = currentState.trim();
        switch (currentStateValue) {
        case 'norm':
            console.log(`Appstate changed: ${stateApp} -> ${currentState.trim()}`);
            stateApp = currentState.trim();
            process.stdout.write(`${currentState.trim()} -> `);
        break;
        case 'test':
            console.log(`Appstate changed: ${stateApp} -> ${currentState.trim()}`);
            stateApp = currentState.trim();
            process.stdout.write(`${currentState.trim()} -> `);
        break;
        case 'idle':
            console.log(`Appstate changed: ${stateApp} -> ${currentState.trim()}`);
            stateApp = currentState.trim();
            process.stdout.write(`${currentState.trim()} -> `);
        break;
        case 'stop':
            console.log(`Appstate changed: ${stateApp} -> ${currentState.trim()}`);
            stateApp = currentState.trim();
            process.stdout.write(`${currentState.trim()} -> `);
        break;
        case 'exit':
            console.log(`Appstate changed: ${stateApp} -> ${currentState.trim()}\nApp is exited.`);
            stateApp = currentState.trim();
            process.exit();
        break;
        default:
            console.log(`Undefined State of the App: ${currentState.trim()}`);
            process.stdout.write(`${stateApp.trim()} -> `);
            break;
        }
    }
});