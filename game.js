var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = true;//for check
var level = 0;

$(document).keypress(function() {
  if (started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = false;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
      if (userClickedPattern.length == gamePattern.length){
        setTimeout(() => {
          nextSequence();
        }, 1000);//500);
      }
    } else {
      playSound("wrong");//sad sound
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart😥");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}


function nextSequence() {//step 2
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * Math.floor(4));
  //console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  // console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);//like a animation, from Stackoverflow
  playSound(randomChosenColor);
}

function animatePress(currentColor) {//animation of press
  $("#" + currentColor).addClass("pressed");
  setTimeout(()=>{
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function playSound(soundName) {
  var audio = new Audio("sounds/" + soundName + ".mp3");//pay music
  audio.play();
}

function startOver() {
  //refresh all var
  level = 0;
  gamePattern = [];
  started = true;
}
