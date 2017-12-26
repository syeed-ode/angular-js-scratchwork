
window.onload = init;

function init() {
    var addButtonInputElement = document.getElementById(INPUT_ELEMENT_ID_BUTTON);
    addButtonInputElement.onclick = createSticky;

    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if(key.substring(0, 6) == STICKY) {
            var value = localStorage.getItem(key);
            addStickyToDom(value);
        }
    }
}

function addStickyToDom(stickyValue) {
    var stickiesUnstructuredListElement = document.getElementById(UNSTCTRD_LIST_ID_STICKY);
    var stickyListItemElement = document.createElement(LIST_ITEM_ELEMENT);
    var spanElement = document.createElement(SPAN_ELEMENT);

    spanElement.setAttribute(CLASS_ATTRIBUTE, STICKY);
    spanElement.innerHTML = stickyValue;
    stickyListItemElement.appendChild(spanElement);
    stickiesUnstructuredListElement.appendChild(stickyListItemElement);
}

/** pg472 **/
function createSticky() {
    var noteTextFormValue = document.getElementById(INPUT_ELEMENT_ID_TEXT).value;
    var key = STICKY + "_" + localStorage.length;
    localStorage.setItem(key, noteTextFormValue);

    addStickyToDom(noteTextFormValue);
}