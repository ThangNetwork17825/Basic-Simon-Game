const buttonColours = ["red", "blue", "green", "yellow"];

const gamePattern = [];

var userPattern = [];

let level = 0;

let gameStarted = false;
i = 0;

function nextSequence() {
    userPattern = []
    // random số từ 0 đến 3
    let randomInteger = Math.floor(Math.random() * 4);
    // gán randomChosenColour thành item trong array buttonColours
    let randomChosenColour = buttonColours[randomInteger];
    // lấy id của nút  
    let activeButton = $("#" + randomChosenColour);
    activeButton.fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // animatePress(randomChosenColour);
    
    // Đẩy item vào mảng gamePattern 
    gamePattern.push(randomChosenColour);
}

// Click
function enableUserInput() {
    $(".btn").click(function () {
        var color = $(this).attr("id");
        handleUserClick(color);
    });
}

function handleUserClick(color) {
    userPattern.push(color);
    playSound(color);
    // animatePress(color);
    let activeButton = $("#" + color);
    activeButton.fadeOut(100).fadeIn(100);
    checkAnswer();
    console.log(userPattern);
}

function playSound(userChosenColor) {
    switch (userChosenColor) {
        case "red":
            let audio1 = new Audio("./sounds/red.mp3");
            audio1.play();
            break;
        case "blue":
            let audio2 = new Audio("./sounds/blue.mp3");
            audio2.play();
            break;
        case "green":
            let audio3 = new Audio("./sounds/green.mp3");
            audio3.play();
            break;
        case "yellow":
            let audio4 = new Audio("./sounds/yellow.mp3");
            audio4.play();
            break;
    }
}

function checkAnswer() {
    let colorUser = userPattern[userPattern.length - 1];
    let colorGame = gamePattern[userPattern.length - 1];
    if ( colorGame != colorUser) {
        resetGame();

        return;
    }
    else {
        if (userPattern.length != gamePattern.length){

            return;
        }
        else {
            setTimeout(function (){
                level++;
                $("h1").text("Level: " +level);
                nextSequence();
            }, 500);
            // $("h1").text("Level " + level++);
            return;
        }
    }
    return false;
}

function resetGame(){
    $("h1").text("Lose, Press Any Key to restart");
    userPattern = [];
    gamePattern.length = 0;
    level = 0;
    gameStarted = false;
}

function animatePress(currenntColor) {
    $("#" + currenntColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currenntColor).removeClass("pressed");
    }, 1500);
}

$(document).ready(function () {
    enableUserInput();
    $(document).keypress(function () {
        if (!gameStarted){    
        gameStarted = true;
        level = 0;
        $("h1").text("Level: " + level);
        nextSequence();
        }
    });
});






