const rpcWS = require('rpc-websockets').Client;

const ws = new rpcWS('ws://localhost:4000');
ws.on('open', () => {
    ws.subscribe('C');
    ws.on('C', () => {
        console.log('event C')
    });
});
