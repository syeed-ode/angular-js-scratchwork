
window.onload = init;

function init() {
    var addButtonInputElement = document.getElementById(INPUT_ELEMENT_ID_BUTTON);
    addButtonInputElement.onclick = createSticky;

    var stickyArray = getStickyArray();

    for(var i = 0; i < stickyArray.length; i++) {
        var key = stickyArray[i];
        var value = localStorage[key];
        addStickyToDom(key, value);
    }
}

function addStickyToDom(key, stickyValue) {
    var stickiesUnstructuredListElement = document.getElementById(UNSTCTRD_LIST_ID_STICKY);
    var stickyListItemElement = document.createElement(LIST_ITEM_ELEMENT);
    stickyListItemElement.setAttribute(ID_ATTRIBUTE, key);
    var spanElement = document.createElement(SPAN_ELEMENT);

    spanElement.setAttribute(CLASS_ATTRIBUTE, STICKY);
    spanElement.innerHTML = stickyValue;
    stickyListItemElement.appendChild(spanElement);
    stickiesUnstructuredListElement.appendChild(stickyListItemElement);

    stickyListItemElement.onclick = deleteSticky;
}

/** pg472 **/
function createSticky() {
    var stickiesArray = getStickyArray();
    var currentDate = new Date();
    var key = STICKY + "_" + currentDate.getTime();

    var noteTextFormValue = document.getElementById(INPUT_ELEMENT_ID_TEXT).value;
    stickiesArray.push(key);
    localStorage.setItem(key, noteTextFormValue);
    localStorage.setItem(STICKY_ARRAY, JSON.stringify(stickiesArray));

    addStickyToDom(key, noteTextFormValue);
}

function getStickyArray() {
    var stickiesArray = localStorage.getItem(STICKY_ARRAY);

    if(!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem(STICKY_ARRAY, JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }

    return stickiesArray;
}

function deleteSticky(e) {
    var key = e.target.id;

    if(e.target.tagName.toLowerCase() == SPAN_ELEMENT) {
        key = e.target.parentNode.id;
    }

    localStorage.removeItem(key);
    var stickiesArray = getStickyArray();

    if(stickiesArray) {
        for (var i = 0; i < stickiesArray.length; i++) {
            if(key == stickiesArray[i]) {
                stickiesArray.splice(i, 1);
            }
        }

        localStorage.setItem(STICKY_ARRAY, JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
    }
}

/** pg489 **/
function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}
