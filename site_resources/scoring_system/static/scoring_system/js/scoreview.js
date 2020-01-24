var socket = null;
var audio_url = null;
var start_url = null;
var timer;
var page_initialized = false;

// Sets the url of the buzzer sound effect
function setURL(url) {
    audio_url = url;
}

function setURL2(url) {
    start_url = url;
}

// Initializes the socket variable and handles events
function startSocket() {
    var loc = window.location;

    // Changes endpoint url if using a secure web socket (Production)
    var wsStart = 'ws://'
    if (loc.protocol == 'https:'){
        wsStart = 'wss://';
    }

    var endpoint = wsStart + window.location.host + loc.pathname;
    socket = new WebSocket(endpoint);

    socket.onmessage = function(e){
        console.log("Got websocket message " + e.data);
        var data = e.data;
        console.log(data);

        /* Messages and their meanings
            'user connected': User has successfully been connected to the web socket
            'start match': Resets and starts timer
            'end match': Stops timer
            'clear': Match has ended and preparation has begun for the next
            'r#': Score update for the red team (# is the point value)
            'b#': Score update for the blue team 
        */

        if (data == 'user connected') {
            document.querySelector('#connection-status').innerHTML = "User Connected";
        } else if (data == 'match start') {
            console.log("AAAAAAAAAAAAAAAAAAAAAAA");
            timer = new _timer;
            timer.reset(150);
            timer.mode(0);
            timer.start();
        } else if (data[0] == 'r') {
            document.querySelector('#red-score').innerHTML = data.slice(1);
        } else if (data[0] == 'b') {
            document.querySelector('#blue-score').innerHTML = data.slice(1);
        } else {
            console.log("Something went wrong");
        }
    }

    socket.onopen = function(e){
        console.log("User Connected");-
        socket.send(JSON.stringify({
            'message': "user connected"
        }));
        // Sends a message to the django consumer to verify that the user is connected
    }
    
    socket.onerror = function(e){
        console.log('error', e);
    }
    socket.onclose = function(e){
        document.querySelector('#connection-status').innerHTML = "Disconnected"
        console.log('close', e);
    }
}

function _timer(callback)
{
    var time = 1;     //  The default time of the timer
    var mode = 1;     //    Mode: count up or count down
    var status = 0;    //    Status: timer is running or stoped
    var timer_id;    //    This is used by setInterval function
    
    // this will start the timer ex. start the timer with 1 second interval timer.start(1000) 
    this.start = function(interval)
    {
        var start_audio = new Audio(start_url);
        start_audio.play();

        interval = (typeof(interval) !== 'undefined') ? interval : 1000;
        
        if(status == 0)
        {
            status = 1;
            timer_id = setInterval(function()
            {
                switch(mode)
                {
                    default:
                    if(time)
                    {
                        time--;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                    
                    case 1:
                    if(time < 86400)
                    {
                        time++;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                }
            }, interval);
        }
    }
    
    //  Same as the name, this will stop or pause the timer ex. timer.stop()
    this.stop =  function()
    {
        if(status == 1)
        {
            status = 0;
            clearInterval(timer_id);
        }
    }
    
    // Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
    this.reset =  function(sec)
    {
        sec = (typeof(sec) !== 'undefined') ? sec : 0;
        time = sec;
        generateTime(time);
    }
    
    // Change the mode of the timer, count-up (1) or countdown (0)
    this.mode = function(tmode)
    {
        mode = tmode;
    }
    
    // This methode return the current value of the timer
    this.getTime = function()
    {
        return time;
    }
    
    // This methode return the current mode of the timer count-up (1) or countdown (0)
    this.getMode = function()
    {
        return mode;
    }
    
    // This methode return the status of the timer running (1) or stoped (1)
    this.getStatus
    {
        return status;
    }
    
    // This methode will render the time variable to hour:minute:second format
    function generateTime()
    {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;

        second = (second < 10) ? '0'+second : second;
        minute = (minute < 10) ? '0'+minute : minute;

        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);

        if (time == 0 && page_initialized) {
            var audio = new Audio(audio_url)
            audio.play()
            timer.stop();
            console.log("Match Ended");
        } else if (time == 0) {
            page_initialized = true;
        }
    }
}

$(document).ready(function(e) 
{
    timer = new _timer
    (
        function(time)
        {
            if(time == 0)
            {
                console.log("Why does this work now?");
            }
        }
    );
    timer.reset(0);
    timer.mode(0);
});