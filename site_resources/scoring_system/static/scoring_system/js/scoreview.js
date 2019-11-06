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
    if (data == 'user connected') {
        document.querySelector('#connection-status').innerHTML = "User Connected";
    } else if (data[0] == 'r') {
        document.querySelector('#red-score').innerHTML = data.slice(1);
    } else if (data[0] == 'b') {
        document.querySelector('#blue-score').innerHTML = data.slice(1);
    }
}

socket.onopen = function(e){
    console.log("User Connected");-
    socket.send(JSON.stringify({
        'message': "user connected"
    }));
}
socket.onerror = function(e){
    console.log('error', e);
}
socket.onclose = function(e){
    document.querySelector('#connection-status').innerHTML = "Disconnected"
    console.log('close', e);
}