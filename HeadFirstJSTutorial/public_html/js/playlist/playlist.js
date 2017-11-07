
window.onload = function() {
    var addSongButton = document.getElementById("addSongButton");
    addSongButton.onclick = handleAddSongButtonClick;
    
    loadPlaylist();
}



function handleAddSongButtonClick() {
    var songTextInput = document.getElementById("songTextInput");
    var songValue = songTextInput.value;
    
    if (songValue == "") {
        alert("Please enter a song")
    } else {
        var li = document.createElement("li");
        li.innerHTML = songValue;

        var ul = document.getElementById(PLAYLIST);
        ul.appendChild(li);
        save(songValue);
    }
}



