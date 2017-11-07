
/* global mapInMapJS */

var LOCATION_DIV = "location";
var WS_DISTANCE_DIV = "distanceFromWickedlySmart";
var MAP_DIV = "map";
var WATCH_BUTTON = "watch";
var CLEAR_BUTTON = "clearWatch";

var WS_COORDS = {
    latitude: 47.624851,
    longitude: -122.52099
};

window.onload = getMyLocation;

function getMyLocation() {
    if(navigator.geolocation) {
        var watchButton = document.getElementById(WATCH_BUTTON);
        watchButton.onclick = watchLocation;
        
        var clearWatchButton = document.getElementById(CLEAR_BUTTON);
        clearWatchButton.onclick = clearWatch;
        
    } else {
        alert("Oops, no geolocation support");
    }
}

var prevCoors = null;
function displayLocation(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var div = document.getElementById(LOCATION_DIV);
    div.innerHTML = "You are at Latitude/Longitude: " 
                        + latitude + ", " + longitude;
    div.innerHTML += " (with " + position.coords.accuracy 
                        + " meters accuracy)";
    div.innerHTML += " (found in " + positionOptionsInWatchJs.timeout
                        + " milliseconds)";
    displayDistanceToWickedlySmart(position.coords);
    if(mapInMapJS == null) {
        showMap(position.coords);
    } else {
        var meters = computeDistance(position.coords, prevCoors) * 1000;
        if(meters > 20) {
            scrollMapToPosition(position.coords);
            prevCoors = position.coords;
        }
    }
}

// 40.2288344, -75.3086364

function displayError(error) {
    var errorType = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    
    var errorMessage = errorType[error.code];
    
    if(error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + ": " + error.message 
                        + ". error code: " + error.code;
    }
        
    positionOptionsInWatchJs.timeout += 100;
    
    var div = document.getElementById(LOCATION_DIV);
    div.innerHTML = errorMessage + " ... checking again with timeout=" 
                        + positionOptionsInWatchJs.timeout;
    watchLocation();
}

