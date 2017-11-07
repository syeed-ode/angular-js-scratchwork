

var EARTH_RADIUS = 6371;

function displayDistanceToWickedlySmart(userCoords) {
    var km = computeDistance(userCoords, WS_COORDS);
    var miles = Math.floor(0.621371 * km);
    
    var distance = document.getElementById(WS_DISTANCE_DIV);
    distance.innerHTML = "You are " + Math.floor(km) 
            + " km " + " and " + miles 
            + " miles from the WickedlySmart HQ";
}

function computeDistance(startCoords, destCoords) {
    var startLatRads  = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads  = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) 
            + Math.cos(startLatRads) 
            * Math.cos(destLatRads) 
            * Math.cos(startLongRads - destLongRads) ) * EARTH_RADIUS;
    
    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}