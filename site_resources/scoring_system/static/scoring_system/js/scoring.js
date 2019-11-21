var socket = null;
var score = 0;
var buzzer;
var timer;

// Initializes the socket variable and handles events
function startSocket() {
    var loc = window.location;

    var wsStart = 'ws://'
    if (loc.protocol == 'https:'){
        wsStart = 'wss://';
    }

    var endpoint = wsStart + window.location.host + '/match';
    socket = new WebSocket(endpoint);
    console.log(endpoint);

    socket.onmessage = function(e){
        console.log("score update", e);
        data = e.data;
        //var team = document.querySelector('#selected-team').innerHTML;
        // Sends current score data if a user connects during a match
        if (data == 'score request') {
            updateScore();
        }
    }
    socket.onopen = function(e){
        console.log("open", e);
        updateScore();
    }
    socket.onerror = function(e){
        console.log("error", e);
    }
    socket.onclose = function(e){
        console.log("close", e);
    }
}

// Defaults all check boxes to the No state
function defaultCheckBoxes() {
    noBoxes = document.getElementsByName("checkNo")
    
    for (i = 0; i < noBoxes.length; i++) {
        noBoxes[i].checked = true;
    }

    yesBoxes = document.getElementsByName("checkYes")

    for (i = 0; i < yesBoxes.length; i++) {
        yesBoxes[i].checked = false;
    }

    precisionUpdate(document.getElementById('precision-select'), true);
    selectBoxes = document.querySelectorAll('#default-select');

    for (i = 0; i < selectBoxes.length; i++) {
        selectUpdate(selectBoxes[i], true);
    }
}

// Logic for checkboxes
function switchCheckBoxes(selectedBox) {
    if (selectedBox.checked == false) { // Don't allow boxes to be turned off by clicking them
        selectedBox.checked = true;
        return;
    }

    boxType = selectedBox.name;
    oppositeType = null;
    subCategory = selectedBox.getAttribute('sub-category');
    criteriaID = selectedBox.getAttribute('criteria-id');

    if (boxType == 'checkYes') {
        oppositeType = 'checkNo';
    } else {
        oppositeType = 'checkYes';
    }

    subCategoryBoxes = document.querySelectorAll('[name="' + boxType + '"][sub-category="' + subCategory.toString() + '"]')
    oppositeSubCategoryBoxes = document.querySelectorAll('[name="' + oppositeType + '"][sub-category="' + subCategory.toString() + '"]')
    oppositeBox = null

    for (i = 0; i < oppositeSubCategoryBoxes.length; i++) {
        currentBox = oppositeSubCategoryBoxes[i];
        if (currentBox.getAttribute('criteria-id') == criteriaID) {
            oppositeBox = currentBox;
        }
    }
    // 	(｡◕‿‿◕｡)
    if (boxType == 'checkYes') {
        for (i = 0; i < subCategoryBoxes.length; i++) {
            currentBox = subCategoryBoxes[i];

            if (currentBox.checked == true && currentBox.getAttribute('criteria-id') != criteriaID) {
                score -= parseInt(currentBox.getAttribute('point-value'));
            }

            currentBox.checked = false;
            oppositeSubCategoryBoxes[i].checked = true;
        }

        selectedBox.checked = true;
        oppositeBox.checked = false;
        score += parseInt(selectedBox.getAttribute('point-value'));
    } else {
        for (i = 0; i < oppositeSubCategoryBoxes.length; i++) {
            currentBox = oppositeSubCategoryBoxes[i];
            if (currentBox.getAttribute('criteria-id') == criteriaID) {
                currentBox.checked = false;
            }
        }
        selectedBox.checked = true;
        score -= parseInt(selectedBox.getAttribute('point-value'));
    }

    updateScore();
}

// Logic for select boxes
function selectUpdate(select, defaulting=false) {
    var oldValue = parseInt(select.getAttribute('old-value'));
    var newValue;
    var pointValue = parseInt(select.getAttribute('point-value'));
    if (defaulting) {
        console.log("Defaulting select box");
        newValue = oldValue;
        select.selectedIndex = newValue;
    } else {
        newValue = parseInt(select.options[select.selectedIndex].value)
        score -= oldValue * pointValue;
    }
    console.log("Subtracting: ", oldValue)
    console.log("Adding ", newValue)
    score += newValue * pointValue;
    select.setAttribute('old-value', newValue)
    if (defaulting) {
        updateScore(true)
    } else {
        updateScore();
    }
}

// Logic for precision tokens since they do not have a single score value associated with them
function precisionUpdate(select, defaulting=false) {
    var oldValue = parseInt(select.getAttribute("old-value"));
    var newValue;
    if (defaulting) {
        newValue = 6;
        select.selectedIndex = 6;
    } else {
        newValue = parseInt(select.options[select.selectedIndex].value);
        if (oldValue <= 2) {
            score -= oldValue * 5;
        } else if (oldValue == 3) {
            score -= 20;
        } else if (oldValue == 4) {
            score -= 30;
        } else if (oldValue == 5) {
            score -= 45;
        } else {
            score -= 60;
        }
    }

    if (newValue <= 2) {
        score += newValue * 5;
    } else if (newValue == 3) {
        score += 20;
    } else if (newValue == 4) {
        score += 30;
    } else if (newValue == 5) {
        score += 45;
    } else {
        score += 60;
    }

    select.setAttribute('old-value', newValue)

    if (defaulting) {
        updateScore(true)
    } else {
        updateScore();
    }
}

// Updates the score on the scoring page and sends a socket message
function updateScore(defaulting = false) {
    document.querySelector('#score-value').innerHTML = score;
    if (defaulting) {
        return;
    }
    var team = document.querySelector('#team-selector').value;
    var message = '';
    if (team == 'red') {
        message = 'r' + score;
    } else {
        message = 'b' + score;
    }
    console.log(message);
    socket.send(JSON.stringify({
        'message': message
    }))
}

// Submits the score and associated team and match to the views.py file to handle
function submitScore() {
    scoreInput = document.getElementsByName('score-submit')[0];
    teamName = document.getElementsByName('name-submit')[0];
    matchChoice = document.getElementsByName('match-submit')[0];
    scoreInput.value = score;
    nameOption = document.getElementsByName('team-choice')[0]
    teamName.value = nameOption.options[nameOption.selectedIndex].value;
    matchOption = document.getElementById('match-choice')
    matchChoice.value = matchOption.options[matchOption.selectedIndex].value;
    document.getElementById('score-form').submit();
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
                timer.stop();
            }
        }
    );
    timer.reset(0);
    timer.mode(0);
});