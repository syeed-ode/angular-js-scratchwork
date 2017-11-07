

var mapInMapJS;

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(
                                coords.latitude
                              , coords.longitude);

    var mapOptions = {
        zoom: 15,       // The zoom option can be 
                        // specified 0 to 21. 10 is about city
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP // also
                        // supported is SATELLITE and
                        // HYBRID
    };
    
    var mapDiv = document.getElementById(MAP_DIV);
    mapInMapJS = new google.maps.Map(mapDiv, mapOptions);
    
    var title = "Your Location";
    var content = "You are here: " + coords.latitude 
            + ", " + coords.longitude;
    addMarker(mapInMapJS, googleLatAndLong, title, content);
}

function addMarker(map, gLatLong, title, content) {
    var markerOptions = {
        position: gLatLong,
        map: map,
        title: title,
        clickable: true
    };
    
    var marker = new google.maps.Marker(markerOptions);
    
    var infoWindowOptions = {
        content: content,
        position: gLatLong
    };
    
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    
    google.maps.event.addListener(marker
        , "click"
        , function(){
            infoWindow.open(map);
        });
}

function scrollMapToPosition(coords) {
    var latitude  = coords.latitude;
    var longitude = coords.longitude;
    
    var gLatLong = new google.maps.LatLng(latitude, longitude);
    
    mapInMapJS.panTo(gLatLong);
    
    var title   = "Your new location";
    var content = "You moved to: " + latitude + ", " + longitude;
    
    addMarker(mapInMapJS, gLatLong, title, content);
}
