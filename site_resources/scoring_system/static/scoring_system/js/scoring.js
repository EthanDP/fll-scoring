function defaultCheckBoxes() {
    noBoxes = document.getElementsByName("checkNo")
    for (i = 0; i < noBoxes.length; i++) {
        noBoxes[i].checked = true;
    }
}

function switchCheckBoxes(boxType, criteriaID, subCategory) {
    opposite = null
    currentBox = document.querySelectorAll('[criteria-id="' + criteriaID.toString() + '"][name="' + boxType + '"]')[0]; // Get the checkbox that was just clicked

    if (currentBox.checked == false) { // Don't allow boxes to be turned off by clicking them
        currentBox.checked = true;
        return;
    }
    if (boxType == "checkYes") { // Find out which boxes may need to be turned off
        yesBoxes = document.querySelectorAll('[sub-category="' + subCategory.toString() + '"][name="' + boxType + '"]');
        for (i = 0; i < yesBoxes.length; i++) { // 	(｡◕‿‿◕｡)
            yesBoxID = yesBoxes[i].getAttribute("criteria-id")
            if (yesBoxID != criteriaID) {
                yesBoxes[i].checked = false;
                noBox = document.querySelectorAll('[criteria-id="' + yesBoxID.toString() + '"][name="checkNo"]')[0];
                noBox.checked = true;
            }
        }
        opposite = "checkNo";

    } else {
        opposite = "checkYes";
    }

    criteriaBox = document.querySelectorAll('[criteria-id="' + criteriaID.toString() + '"][name="' + opposite + '"]')[0]; // Grab the other checkbox...
    criteriaBox.checked = false; // And turn the state to false
}

function switchCheckBoxStatus() {
    console.log("Hey");
}