buttonSeq=["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];
var lvl=0;
function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text("Level "+lvl);
    lvl++;
    var rdmnum=Math.floor((Math.random())*4);
    var randomChosenColour=buttonSeq[rdmnum];
    gamePattern.push(randomChosenColour);
    var a=$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds"+"/"+randomChosenColour+".mp3");
    audio.play();
}
function catchseq(curlvl){
    if(userClickedPattern[curlvl]==gamePattern[curlvl]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence(),1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
$(".btn").click(function(){
    var ChosenColour=this.classList[1];
    var userChosenColour=$("#"+ChosenColour);
    userClickedPattern.push(ChosenColour);
    var audio = new Audio("sounds"+"/"+ChosenColour+".mp3");
    audio.play();
    animatepress(ChosenColour);
    catchseq(userClickedPattern.length-1);
});
function animatepress(curclr){
    $("."+curclr).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 100);
}
$(document).keypress(function(){
    $("#level-title").text("Level "+lvl);
    nextSequence();
})
function startOver(){
    lvl=0;
    gamePattern=[];
}
