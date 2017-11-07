
var watchIdInWatchJs = null;
var positionOptionsInWatchJs = {enableHighAccuracy: true, timeout: 100, maximumAge: 0};

function watchLocation() {
    watchIdInWatchJs = navigator.geolocation
                .getCurrentPosition(displayLocation
                        , displayError
                        , positionOptionsInWatchJs);
    // this my personal code. It seems that watchId
    // only returns a value for successful locations
    // we need to beable to stop watching even if the
    // location fails
    if(watchIdInWatchJs == null) {
        watchIdInWatchJs = 1;
    }
}

function clearWatch() {
    if(watchIdInWatchJs) {
        navigator.geolocation.clearWatch(watchIdInWatchJs);
        watchIdInWatchJs = null;
    }
}