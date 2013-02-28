var ws = new WebSocket('ws://localhost:8123');

ws.onmessage = function (event) {
    console.log("Received from server: " + event.data);
};

ws.onopen = function () {
    ws.send('yay! we connected!');
};
