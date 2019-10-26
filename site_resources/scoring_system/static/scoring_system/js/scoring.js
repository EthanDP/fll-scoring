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

    } else {
        opposite = "checkYes";
        otherOpposite = "checkNo";
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
}

function switchCheckBoxStatus() {
    console.log("Hey");
}