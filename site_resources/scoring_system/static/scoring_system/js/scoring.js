var socket = null;
var score = 0;

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

function defaultCheckBoxes() {
    noBoxes = document.getElementsByName("checkNo")
    for (i = 0; i < noBoxes.length; i++) {
        noBoxes[i].checked = true;
    }
    yesBoxes = document.getElementsByName("checkYes")
    for (i = 0; i < yesBoxes.length; i++) {
        yesBoxes[i].checked = false;
    }
}

function switchCheckBoxes(boxType, criteriaID, subCategory) {
    opposite = null
    otherOpposite = null
    currentBox = document.querySelectorAll('[criteria-id="' + criteriaID.toString() + '"][name="' + boxType + '"][sub-category="' + subCategory.toString() + '"]')[0]; // Get the checkbox that was just clicked
    console.log(criteriaID);
    if (currentBox.checked == false) { // Don't allow boxes to be turned off by clicking them
        currentBox.checked = true;
        return;
    }
    if (boxType == "checkYes") { // Find out which boxes may need to be turned off
        yesBoxes = document.querySelectorAll('[sub-category="' + subCategory.toString() + '"][name="' + boxType + '"]');
        console.log(yesBoxes);
        console.log("subCategory: " + subCategory);
        for (i = 0; i < yesBoxes.length; i++) { // 	(｡◕‿‿◕｡)
            yesBoxID = yesBoxes[i].getAttribute("criteria-id")
            if (yesBoxID != criteriaID) {
                yesBoxes[i].checked = false;
                noBox = document.querySelectorAll('[criteria-id="' + yesBoxID.toString() + '"][name="checkNo"]')[0];
                noBox.checked = true;

            }
        }
        opposite = "checkNo";
        otherOpposite = "checkYes";
        score += parseInt(currentBox.getAttribute('point-value'))
        console.log("New score: ", score)

    } else {
        opposite = "checkYes";
        otherOpposite = "checkNo";
        score -= parseInt(currentBox.getAttribute('point-value'))
    }

    criteriaBoxes = document.querySelectorAll('[name="' + opposite + '"][sub-category="' + subCategory.toString() + '"]'); // Grab the other checkbox...
    oppositeBoxes = document.querySelectorAll('[name="' + otherOpposite + '"][sub-category="' + subCategory.toString() + '"]');
    for (i = 0; i <criteriaBoxes.length; i++) {
        criteriaBoxes[i].checked = false; // And turn the state to false
        if (criteriaBoxes[i].getAttribute("criteria-id") != criteriaID && opposite != "checkYes") {
            console.log("EJEJEJEJ");
            criteriaBoxes[i].checked = true;
        }
    }

    document.querySelector('#score-value').innerHTML = score;
    updateScore();
}

function switchCheckBoxStatus() {
    console.log("Hey");
}

function buttonPress() {
    updateScore()
}

function updateScore() {
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