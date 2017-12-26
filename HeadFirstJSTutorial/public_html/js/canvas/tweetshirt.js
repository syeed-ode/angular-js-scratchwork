

window.onload = function() {
    var button = document.getElementById(PREV_BUTTON);
    button.onclick = previewHandler;
}

function previewHandler() {
    var canvas = document.getElementById(CANVAS_ELEMENT);
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas, context);
    drawShapes(canvas, context);
    drawText(canvas, context);
}

function fillBackgroundColor(canvas, context) {
    var bgSelector = document.getElementById(BG_SELECT_ELEMENT);
    var bgSelIndex = bgSelector.selectedIndex;
    var bgSelColor = bgSelector[bgSelIndex].value;
    context.fillStyle = bgSelColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawShapes(canvas, context) {
    var shapeSelector = document.getElementById(SHAPE_SELECT_ELEMENT);
    var shapeSelIndex = shapeSelector.selectedIndex;
    var shapeSelValue = shapeSelector[shapeSelIndex].value;
    for (var i = 0; i < 20; i++) {
        if (shapeSelValue == SQUARE_OPTION) {
            drawSquares(canvas, context);
        } else if (shapeSelValue == CIRCLE_OPTION) {
            drawCircle(canvas, context);
        }
    }
}

function drawSquares(canvas, context) {
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.fillStyle = "lightblue";
    context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context) {
    var radius = Math.random() * 40;
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;

    context.beginPath();
    // x, y:                    The x and y parameters
    //                          determine the center of the circle
    // direction:               If direction is true, we go
    //                          counterclockwise; if it’s false, we
    //                          go clockwise.
    //                                  true  = counterclockwise
    //                                  false = clockwise
    // startAngle, endAngle:    determine where your arc path starts
    //                          and stops on the circle. Angles can
    //                          be measured in the negative direction
    //                          (counterclockwise from the x-axis) or
    //                          in the positive direction. An angle
    //                          measured going counterclockwise from
    //                          the x-axis is negative. Like -35 degrees.
    //                                  negative = counterclockwise
    //                                  positive = clockwise

    // context.arc(x,  y, radius, startAngle,                endAngle, direction)
    context.arc(   x,  y, radius,          0,   degreesToRadians(360),      true);
    // context.lineWidth = 5;
    // context.stroke();
    context.fillStyle = "lightblue";
    context.fill();
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}


function updateSales(twitterData) {
    var tweetSelector = document.getElementById(TWEET_SELECT_ELEMENT);

    for(var i = 0; i < twitterData.length; i++) {
        tweet = twitterData[i];
        var optionElement = document.createElement(OPTION_ELEMENT);
        optionElement.text  = tweet.name;
        optionElement.value = "Name: " + tweet.name + ", number of sales: " + tweet.sales;
        tweetSelector.options.add(optionElement);
    }

    tweetSelector.selectedIndex = 0;
}

function drawText(canvas, context) {
    var fgSelector = document.getElementById(FG_SELECT_ELEMENT);
    var fgSelIndex = fgSelector.selectedIndex;
    var fgSelValue = fgSelector[fgSelIndex].value;
    context.fillStyle  = fgSelValue;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);

    drawTweetSelection(context);

    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt", canvas.width-20, canvas.height - 40);

}

function drawTweetSelection(context) {
    var tweetSelector = document.getElementById(TWEET_SELECT_ELEMENT);
    var tweetSelIndex = tweetSelector.selectedIndex;
    var tweetSelValue = tweetSelector[tweetSelIndex].value;

    var twitterBird = new Image();
    twitterBird.src = "twitterBird.png";
    twitterBird.onload = function () {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    };

    context.font = "italic 1.2em serif";
    context.fillText(tweetSelValue, 30, 100);
}

function fillInTriangle(context) {
    context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(250, 75);
    context.lineTo(125, 30);
    context.closePath();
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle = "red";
    context.fill();
}

// Head First HTML with CSS & XHTML