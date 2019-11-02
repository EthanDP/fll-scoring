var loc = window.location;

var wsStart = 'ws://'
if (loc.protocol == 'https:'){
    wsStart = 'wss://';
}

var endpoint = wsStart + window.location.host + loc.pathname;
var socket = new WebSocket(endpoint);
console.log(endpoint);

socket.onmessage = function(e){
    console.log("Got websocket message " + MessageChannel.data);
    var data = JSON.parse(e.data);
    var message = data['message']
    if (message = 'connected') {
        document.querySelector('#bluescore').value = "User Connected";
    } else {

    }
    document.querySelector('#redscore').value = "Received data";
}

socket.onopen = function(e){
    socket.send(JSON.stringify({
        'message': "connected"
    }))
}
socket.onerror = function(e){
    console.log('error', e);
}
socket.onclose = function(e){
    console.log('close', e);
}

document.querySelector('#test-button').onclick = function(e) {
    var message = "Yo";
    console.log("Help");
    socket.send(JSON.stringify({
        'message': message
    }))
}