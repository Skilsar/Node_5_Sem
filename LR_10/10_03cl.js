const WebSocket = require('ws');

let parm2 = process.argv[2];

console.log('Client name = ', parm2);

let prfx = typeof parm2 == 'underfined' ? 'A' : parm2;
const ws = new WebSocket('ws://localhost:5000/broadcast');

ws.on('open', () => {
    let k = 0;
    setInterval(() => {
        ws.send(`client: ${prfx}-${++k}`);
    }, 5000);

    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    })
});