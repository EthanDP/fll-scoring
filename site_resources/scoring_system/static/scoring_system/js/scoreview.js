var loc = window.location;

var wsStart = 'ws://'
if (loc.protocol == 'https:'){
    wsStart = 'wss://';
}

var endpoint = wsStart + window.location.host + loc.pathname;
var socket = new WebSocket(endpoint);
console.log(endpoint);

socket.onmessage = function(e){
    console.log("Got websocket message " + e.data);
    var data = e.data;
    console.log(data);
    if (data == 'connected') {
        document.querySelector('#connection-status').innerHTML = "User Connected";
    } if (data) {
        document.querySelector('#red-score').innerHTML = data;
    }
}

socket.onopen = function(e){
    console.log("User Connected");
    socket.send(JSON.stringify({
        'message': "connected"
    }));
}
socket.onerror = function(e){
    console.log('error', e);
}
socket.onclose = function(e){
    console.log('close', e);
}

document.querySelector('#test-button').onclick = function(e) {
    var message = "Yee";
    console.log("Help");
    socket.send(JSON.stringify({
        'team': 'red',
        'message': message
    }))
}

document.querySelector('#test-button2').onclick = function(e) {
    var message = "Haw";
    console.log("Help");
    socket.send(JSON.stringify({
        'message': message
    }))
}