
var drink = "Energy Drink";
var lyrics = "";
var cans = 99;

while(cans > 0) {
    lyrics = lyrics + cans + " cans of " 
            + drink 
            + " on the wall <br>";

    lyrics = lyrics + cans + " cans of " 
            + drink + "<br>";

    lyrics = lyrics + "Take one daown, pass it around<br>";

    if(cans > 1) {
        lyrics = lyrics + (cans -1) + " cans of " 
                + drink 
                + " on the wall <br><br>";
    } else {
        lyrics = lyrics + "No more cans of " 
                + drink 
                + " on the wall. <p><br>";
    }
    cans = cans - 1;
}

document.write(lyrics);
            