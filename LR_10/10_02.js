let WebSocket = require("ws");

let webSocket = new WebSocket("ws:/localhost:4000/wsserver");

let k = 0;
webSocket.on("open", () => {
    console.log("WebSocket: OnOpen Dispatcher");
    let n = 1;
    let sendingInterval = setInterval(() => {
        webSocket.send(`10-02-client: ${n++}`);
    }, 3000);

    setTimeout(() => {
        clearInterval(sendingInterval);
        webSocket.close();
    }, 25000);
});

webSocket.on("message", (serverResponse) => {
    console.log('WebSocket: OnMessage Dispatcher');
    console.log(`Server Response: ${serverResponse.toString()}`);
});

webSocket.on("error", (error) => {
    console.log('WebSocket: OnError Dispatcher');
    console.log(`Error: ${error.message}`);
});

webSocket.on("close", () => {
    console.log('WebSocket: OnClose Dispatcher.\nSocket was closed.');
});