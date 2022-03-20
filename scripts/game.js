$(document).ready(function () {
  let start = false;
  let level = 0;

  let buttonColours = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userClickedPattern = [];

  $(document).keypress(() => {
    if(!start){
        nextSequence();
        start = true;
    }
  })

  $(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  })

  const checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
      if(userClickedPattern.length == gamePattern.length){
        setTimeout(function(){
          nextSequence()
        },1000)
      }
    }
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      },200)
      $("#level-title").text("Game Over,Press Any Key to Restart");
      startOver();
    }
  }

  const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    let chosenColourId = $("#" + randomChosenColour);
    chosenColourId.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  };



  const playSound = (colour) => {
    var audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
  };

  const animatePress = (currentColour) => {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
      $("#"+currentColour).removeClass("pressed");
    },100)
  }

  const startOver = () => {
    level = 0;
    gamePattern = [];
    start = false;
  }
});
