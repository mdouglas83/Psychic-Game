var iSecret = 0; // secret letter keycode
var iWon = 0;
var iLost = 0;
var iGuess = 0;
var aGuesses = [];

function genSecret() {
    var rnd = Math.floor(Math.random() * 26) + 97;
    while (iSecret === rnd) {
        rnd = Math.floor(Math.random() * 26) + 97;
    }
    iSecret = rnd;
    iGuess = 0;
    aGuesses = [];
    document.getElementById("Won").textContent = iWon;
    document.getElementById("Lost").textContent = iLost;
    document.getElementById("Guess").textContent = 10 - iGuess;
    document.getElementById("Guesses").textContent = "none";
}

function keyPress(event) {
    if (!(iSecret === 0) && iGuess < 10) {
        var iKey = event.which || event.keyCode;
        if (iKey >= 65 && iKey <= 90 || iKey >= 97 && iKey <= 122) {
            var cKey = String.fromCharCode(iKey).toLowerCase();
            var bUsed = false;
            var sGuesses = "";
            if (aGuesses.length == 0) {
                iGuess += 1;
                aGuesses[0] = cKey;
                sGuesses = cKey;
            } else {
                for (i = 0; i < aGuesses.length; i++) {
                    sGuesses += " " + aGuesses[i];
                    if (aGuesses[i] === cKey) {
                        bUsed = true;
                    }
                }
                if (!bUsed) {
                    iGuess += 1;
                    aGuesses.push(cKey)
                    sGuesses += " " + cKey;
                } else {
                    sGuesses += " Already Used!";
                }
            }
            if (cKey === String.fromCharCode(iSecret)) {
                alert("The secret letter was " + String.fromCharCode(iSecret) + ". You win!");
                iWon += 1;
                iSecret = 0;
            } else if (iGuess === 10) {
                alert("The secret letter was " + String.fromCharCode(iSecret) + ". You lost.");
                iLost += 1;
                iSecret = 0;
            }
            document.getElementById("Guesses").textContent = sGuesses;
            document.getElementById("Won").textContent = iWon;
            document.getElementById("Lost").textContent = iLost;
            document.getElementById("Guess").textContent = 10 - iGuess;
        }
    }
}

window.onload = function() {
    genSecret();
};

document.onkeypress = function(event) {
    keyPress(event);
};