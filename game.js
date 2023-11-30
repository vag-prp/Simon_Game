var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;

$(document).keypress(function(){


    if (!start){
        
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    } 
});


$(document).keypress(function(event){

    var userChosenColour = $("." + event.key).attr("id");

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

/*$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})*/

function nextSequence(){
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = (Math.floor(Math.random()*4));

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    
};

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout (function(){
        $("#" + currentColour).removeClass("pressed");
    },100)
};

function startOver(){
    gamePattern = [];

    level = 0;

    start = false;

};

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 500);

      }

    } else {

      var audio1 = new Audio("./sounds/wrong.mp3");
      audio1.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);  

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
    }

}


/*$(document).keypress(function(event){
    alert($("." + event.key).attr("id"));

});*/