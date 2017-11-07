
var PLAYLIST = "playlist";

function save(songTitle) {
    var playListArray = getStoreArray(PLAYLIST);
    playListArray.push(songTitle);
    localStorage.setItem(PLAYLIST, JSON.stringify(playListArray));
}

function loadPlaylist() {
    var playlistArray = getSavedSongs();
    var ui = document.getElementById(PLAYLIST);
    if(playlistArray != null) {
        for(var i = 0; i < playlistArray.length; i++) {
            if(playlistArray[i] != ""){
                var li = document.createElement("li");
                li.innerHTML = playlistArray[i];
                ui.appendChild(li);
            }
        }
    }
}

function getStoreArray(key) {
    var playlistArray = localStorage.getItem(key);
    if(playlistArray == null || playlistArray == "") {
        playlistArray = new Array();
    } else {
        playlistArray = JSON.parse(playlistArray);
    }
    return playlistArray;
}

function getSavedSongs() {
    return getStoreArray(PLAYLIST);
}