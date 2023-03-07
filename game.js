const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


let Level = 0;
let isGameStarted = false;

$(document).keypress(function (e) {
    startGame();
});

$(document).click(() => {
    startGame();
});

function startGame() {
    if (isGameStarted != true) {
        isGameStarted = true;
        nextSequence();
    }
}




function nextSequence() {
    userClickedPattern = [];

    const randomNumber = Math.round(Math.random() * 3);
    let randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);
    if (isGameStarted != false) {
        playSound(randomChosenColour);
        animatePress(randomChosenColour);
    }
    console.log("gamepattern : " + gamePattern);
    console.log("useclickedpattern : " + userClickedPattern);

    Level++;
    $("#level-title").text(`Level ${Level}`);
}

function playSound(ele) {
    var audio = new Audio(`./sounds/${ele}.mp3`);
    audio.play();
}


$(".btn").click(function (e) {

    let userChosenColour = $(this).attr("id");
    $(this).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

    console.log("gamepattern : " + gamePattern);
    console.log("useclickedpattern : " + userClickedPattern);
})

function animatePress(currentColour) {
    console.log
    $(`.${currentColour}`).addClass('pressed');
    setInterval(() => {
        $(`.${currentColour}`).removeClass('pressed');
    }, 100);
}


function checkAnswer(currentLevel) {
    // Check Users answer against game pattern 

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        let audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        console.log("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        setTimeout(() => {
            startOver();
        }, 1000);

    }

}

function startOver() {
    Level = 0;
    gamePattern = [];
    isGameStarted = false;
    $("#level-title").text("Press A Key To Start");
}  