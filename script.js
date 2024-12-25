var gamePattern=[];
var userClickedPattern =[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        started=true;
        $("#level-title").text("level 0");
        nextSequence();   
    }
})

$(".btn").click(function (){

    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);
    sound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length ===gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        
        }
    }
    else{
        sound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
           $("body").removeClass("game-over");
         }, 200);

        startOver();

    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text(`level ${level} `);
    var randomChosenColour= buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);
    sound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function sound(key){
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  

