
var videos = {video1: "video/demovideo1", video2: "video/demovideo2"};
var effectFunction = null;


window.onload = function () {

    var videoElement = document.getElementById(VIDEO_ELEMENT_ID);
    videoElement.src = videos.video1 + getFormatExtension(videoElement);
    videoElement.load();

    var controlLinks = document.querySelectorAll(ANCHOR_CLASS_CONTROL);
    for (var i = 0; i < controlLinks.length; i++) {
        controlLinks[i].onclick = handleControl;
    }

    var effectLinks = document.querySelectorAll(A_EFFECT_CLASS);
    for (var i = 0; i < effectLinks.length; i++) {
        effectLinks[i].onclick = setEffect;
    }

    var videoLinks= document.querySelectorAll(A_VIDEO_SEL_CLASS);
    for (var i = 0; i < videoLinks.length; i++) {
        videoLinks[i].onclick = setVideo;
    }

    pushUnpushBottons(ANCHOR_ID_VIDEO1, []);
    pushUnpushBottons(ANCHOR_ID_NORMAL, []);

    videoElement.addEventListener(ENDED_EVENT, videoEndedHandler, false);
    videoElement.addEventListener(ANCHOR_ID_PLAY, processFrame, false);
    videoElement.addEventListener(ERROR_EVENT, erroHandler, false);
};

function getFormatExtension(video) {
    if (video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if (video.canPlayType("video/webm") != "") {
        return ".webm";
    } else if (video.canPlayType("video/ogg") != "") {
        return ".ogv";
    }
}

function handleControl(e) {
    var id = e.target.getAttribute(ID_ATTRIBUTE);
    executeButtonAction(id);
    executeControlAction(id);
}

function executeButtonAction(id) {
    if (isButtonPushed(id)) {
        pushUnpushBottons(EMPTY_STRING, [id]);
    } else {
        pushUnpushBottons(id, getUnpushList(id));
    }
}

function executeControlAction(id) {
    var videoElement = document.getElementById(VIDEO_ELEMENT_ID);

    if(id == ANCHOR_ID_PLAY) {
        playVideo(videoElement);
    } else if (id == ANCHOR_ID_PAUSE) {
        videoElement.pause();
    } else if (id == ANCHOR_ID_LOOP) {
        videoElement.loop = !videoElement.loop;
    } else if (id == ANCHOR_ID_MUTE) {
        videoElement.muted = !videoElement.muted;
    }
}

function pushUnpushBottons(idToPush, idArrayToUnpush) {
    if(idToPush != EMPTY_STRING) {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute(CLASS_ATTRIBUTE);
        if(!theClass.indexOf(SELECTED_STATE) >= 0) {
            theClass = theClass + " " + SELECTED_STATE;
            anchor.setAttribute(CLASS_ATTRIBUTE, theClass);
            var newImage = "url(images/" + idToPush + "pressed.png)";
            anchor.style.backgroundImage = newImage;
        }
    }

    for (var i = 0; i < idArrayToUnpush.length; i++) {
        anchor = document.getElementById(idArrayToUnpush[i]);
        theClass = anchor.getAttribute(CLASS_ATTRIBUTE);
        if(theClass.indexOf(SELECTED_STATE) >= 0) {
            theClass = theClass.replace(SELECTED_STATE, EMPTY_STRING);
            anchor.setAttribute(CLASS_ATTRIBUTE, theClass);
            anchor.style.backgroundImage = EMPTY_STRING;
        }
    }
}

function setEffect(e) {
    var id = e.target.getAttribute(ID_ATTRIBUTE);
    pushUnpushBottons(id, getUnpushList(id));

    if (id == ANCHOR_ID_NORMAL) {
        effectFunction = null;
    } else if (id == ANCHOR_ID_WESTERN) {
        effectFunction = western;
    } else if (id == ANCHOR_ID_NOIR) {
        effectFunction = noir;
    } else if (id == ANCHOR_ID_SCIFI) {
        effectFunction = scifif;
    }
}

function setVideo(e) {
    var id = e.target.getAttribute(ID_ATTRIBUTE);
    pushUnpushBottons(id, getUnpushList(id));
    var videoElement = document.getElementById(VIDEO_ELEMENT_ID);
    videoElement.src = videos[id] + getFormatExtension(videoElement);
    videoElement.load();
    videoElement.play();
    pushUnpushBottons(ANCHOR_ID_PLAY, getUnpushList(ANCHOR_ID_PLAY));
}

function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute(CLASS_ATTRIBUTE);
    return (theClass.indexOf(SELECTED_STATE) >- 0);
}

function getUnpushList(id) {
    if(id == ANCHOR_ID_PLAY) {
        return [ANCHOR_ID_PAUSE];
    } else if (id == ANCHOR_ID_PAUSE) {
        return [ANCHOR_ID_PLAY];
    } else if (id == ANCHOR_ID_LOOP || id == ANCHOR_ID_MUTE) {
        return [];
    } else if (id == ANCHOR_ID_NORMAL) {
        return [ANCHOR_ID_WESTERN, ANCHOR_ID_NOIR, ANCHOR_ID_SCIFI];
    } else if (id == ANCHOR_ID_WESTERN) {
        return [ANCHOR_ID_NORMAL, ANCHOR_ID_NOIR, ANCHOR_ID_SCIFI];
    } else if (id == ANCHOR_ID_NOIR) {
        return [ANCHOR_ID_NORMAL, ANCHOR_ID_WESTERN, ANCHOR_ID_SCIFI];
    } else if (id == ANCHOR_ID_SCIFI) {
        return [ANCHOR_ID_NORMAL, ANCHOR_ID_WESTERN, ANCHOR_ID_NOIR];
    } else if (id == ANCHOR_ID_VIDEO1) {
        return [ANCHOR_ID_VIDEO2];
    } else if (id == ANCHOR_ID_VIDEO2) {
        return [ANCHOR_ID_VIDEO1];
    }
}

function playVideo(videoElement) {
    if(videoElement.ended) {
        videoElement.load();
    }
    videoElement.play();
}

function videoEndedHandler() {
    pushUnpushBottons(EMPTY_STRING, [ANCHOR_ID_PLAY]);
}

function processFrame() {
    var videoElement = document.getElementById(VIDEO_ELEMENT_ID);

    if(videoElement.paused || videoElement.ended) {
        return;
    }

    var bufferCanvas  = document.getElementById(CANVAS_ID_BUFFER);
    var displayCanvas = document.getElementById(CANVAS_ID_DISPLAY);
    var buffer = bufferCanvas.getContext(CANVAS_CONTEXT_2D);
    var display = displayCanvas.getContext(CANVAS_CONTEXT_2D);

    buffer.drawImage(videoElement, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

    var length = frame.data.length / 4;
    for (var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];

        if(effectFunction) {
            effectFunction(i, r, g, b, frame.data);
        }
    }

    display.putImageData(frame, 0,0);

    setTimeout(processFrame, 0);
}

function noir(position, red, green, blue, data) {
    var brightness = (3*red + 4*green + blue) >>> 3;
    if(brightness < 0) brightness = 0;
    data[position * 4 + 0] = brightness;
    data[position * 4 + 1] = brightness;
    data[position * 4 + 2] = brightness;
}

function western(position, red, green, blue, data) {
    var brightness = (3*red + 4*green + blue) >>> 3;
    data[position * 4 + 0] = brightness + 40;
    data[position * 4 + 1] = brightness + 20;
    data[position * 4 + 2] = brightness - 20;
}

function scifif(position, red, green, blue, data) {
    var offset = position * 4;
    data[offset] = Math.round(255 - red);
    data[offset + 1] = Math.round(255 - green);
    data[offset + 2] = Math.round(255 - blue);
}

function erroHandler() {
    var videoElement = document.getElementById(VIDEO_ELEMENT_ID);

    if(videoElement.error) {
        videoElement.poster = "images/technicaldifficulties.jpg";
        alert(displayErrorText(videoElement.error.code));
    }
}

function displayErrorText(code) {
    if(code == MEDIA_ERR_ABORTED) {
        return "MEDIA_ERR_ABORTED";
    } else if (code == MEDIA_ERR_NETWORK) {
        return "MEDIA_ERR_NETWORK";
    } else if (code == MEDIA_ERR_DECODE) {
        return "MEDIA_ERR_DECODE";
    } else if (code == MEDIA_ERR_SRC_NOT_SUPPORTED) {
        return "MEDIA_ERR_SRC_NOT_SUPPORTED";
    } else {
        return "Not sure what happend here. Error code: " + code;
    }
}
