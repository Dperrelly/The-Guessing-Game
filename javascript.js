function guess(){
  var currentGuess = parseInt($("#input")[0].value);
  if (guessesLeft === 0){
    fadeMessage("Out of guesses! Click the Reset button to try again.", "red");
  }
  else{
    if (validate(currentGuess)){
      for(var i = 0; i < guessArray.length; i++){
        if (guessArray[i] === currentGuess){
          fadeMessage("You guessed that already! Try a new number", "red");
          return;
        }
      }
      if (currentGuess === theNumber){
        fadeMessage("Success!", "#00FF00");
        $("#smiley").fadeIn();
      }
      else{
        var feedback = "";
        if (guessesLeft < 5){
          feedback += (Math.abs(currentGuess - theNumber) < Math.abs(guessArray[guessArray.length - 1] - theNumber)) ?
            "You're getting warmer! ":"You're getting colder! "
        }
        var heat = Math.abs(currentGuess - theNumber);
        if (heat > 25){
          feedback += "You are cold. ";
        }
        else if (heat > 15){
          feedback += "You are cool. ";
        }
        else if (heat > 10){
          feedback += "You are warm. ";
        }
        else if (heat > 5){
          feedback += "You are hot!. ";
        }
        else{
          feedback += "You are very hot!. ";
        }
        feedback += (currentGuess < theNumber) ? "Try guessing higher.":"Try guessing lower.";
        
        guessArray.push(currentGuess);
        guessesLeft--;
        guessesLeft === 0 ? fadeMessage("Out of guesses! Click the Reset button to try again.", "red"):fadeMessage(feedback);
        fadeMessage(guessesLeft, "white", "#guesses");
        if (guessArray.length === 1){
          $("#guessHistory").fadeIn();
        }
        guessId = "#guess" + guessArray.length;
        $(guessId).html("" + currentGuess + ": " + feedback);
        $(guessId).fadeIn();
      }
    }
  }
}
function hint(){
  fadeMessage("Try " + theNumber);
}
function reset(){
  theNumber = Math.ceil(Math.random() * 100);
  guessesLeft = 5;
  $("#input")[0].value = "";
  guessArray = [];
  $(".guess").fadeOut();
  $("#smiley").fadeOut();
  fadeMessage("Go ahead! Try to guess the number between 1 and 100");
  fadeMessage(guessesLeft, "white", "#guesses");
}
function validate(input){
  if (isNaN(input) === true || input < 1 || input > 100 || input % 1 !== 0){
    fadeMessage("Please input an integer between 1 and 100.", "red");
    return false;
  }
  return true;
}
function fadeMessage(string, color, id){
  if(typeof id !== "string") id = "#message";
  $(id).fadeOut();
  setTimeout(function(){
    $(id)[0].innerHTML = string;
    if (typeof color === "string"){
      $(id)[0].style.color = color;
    }
    else $(id)[0].style.color = "white";
  }, 400);
  $(id).fadeIn();
}

theNumber = Math.ceil(Math.random() * 100);
guessesLeft = 5;
guessArray = [];
