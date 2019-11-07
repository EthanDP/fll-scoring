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
                console.log("bruh moment")
                score -= parseInt(currentBox.getAttribute('point-value'));
            }
            currentBox.checked = false;
            oppositeSubCategoryBoxes[i].checked = true;
        }
        selectedBox.checked = true;
        oppositeBox.checked = false;
        score += parseInt(currentBox.getAttribute('point-value'));
    } else {
        for (i = 0; i < oppositeSubCategoryBoxes.length; i++) {
            currentBox = oppositeSubCategoryBoxes[i];
            if (currentBox.getAttribute('criteria-id') == criteriaID) {
                currentBox.checked = false;
            }
        }
        selectedBox.checked = true;
        score -= parseInt(currentBox.getAttribute('point-value'));
    }

    document.querySelector('#score-value').innerHTML = score;
    updateScore();
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