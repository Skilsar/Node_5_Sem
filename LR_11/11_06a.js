const rpcWS = require('rpc-websockets').Client;

const ws = new rpcWS('ws://localhost:4000');
ws.on('open', () => {
    ws.subscribe('A');
    ws.on('A', () => {
        console.log('event A')
    });
});